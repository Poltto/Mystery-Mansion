import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/reducers";
import { useEffect, useRef, useState } from "react";
import {GameObject} from "../endpoints/endpoint.game-object";
import {ObstacleCreator} from "../obstacle-creator/obstacleCreator";
import {ACTIONS} from "../redux/actions";
import {Item} from "../endpoints/endpoint.item";
import {ItemCreator} from "../item-creator/itemCreator";
import {useEventListener} from "../use-event-listener";
import {STATICS} from "../enums/statics";
import {EditModeTileSelection} from "./edit-mode.tile-selection";
import { useMutation, useQuery } from '@apollo/client';
import { GAME_OBJECT_MUTATIONS } from '../graphql/mutations/graphql.mutations.game-object';
import { GAME_OBJECT_QUERIES } from '../graphql/queries/graphql.queries.game-object';
import { ITEM_QUERIES } from '../graphql/queries/graphql.queries.item';
declare const jQuery;
export function EditMode() {
  const dispatch = useDispatch();
  const html = $('html');

  const [createGameObject, {data, loading, error}] = useMutation(GAME_OBJECT_MUTATIONS.CREATE_GAME_OBJECT);
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
  let lastMousePosition = useRef({x: 0, y: 0});
  let clicked = useRef(false);
  let creating = useRef(false);
  let createdTileIds = useRef({});
  const obstacles = useSelector((state: RootState) => {
    return Object.values(state.ObstacleReducer.obstacles);
  });

  const obstaclesObject = useSelector((state: RootState) => {
    return state.ObstacleReducer.obstacles;
  });

  const items = useSelector((state: RootState) => {
    return Object.values(state.ItemReducer.items);
  });

  const selectedTile = useSelector((state: RootState) => {
    return state.EditModeReducer.selectedTile;
  });

  const isTileSelectionOpen = useSelector((state: RootState) => {
    return state.EditModeReducer.isTileSelectionOpen;
  });

  const isBlocking = useSelector((state: RootState) => {
    return state.EditModeReducer.isBlocking;
  })

  const name = useSelector((state: RootState) => {
    return state.EditModeReducer.name;
  })

  const onInteract = useSelector((state: RootState) => {
    return state.EditModeReducer.onInteract;
  })

  const isTileCreationOn = useSelector((state: RootState) => {
    return state.EditModeReducer.isTileCreationOn;
  })

  const zoomLevel = useSelector((state: RootState) => {
    return state.AppReducer.zoomLevel;
  })

  useEventListener('mousemove', (event) => {
    if(clicked.current && !isTileCreationOn) {
      html.scrollTop(html.scrollTop() + (lastMousePosition.current.y - event.clientY));
      html.scrollLeft(html.scrollLeft() + (lastMousePosition.current.x - event.clientX));
      lastMousePosition.current.y = event.clientY;
      lastMousePosition.current.x = event.clientX;
    } else if(isTileCreationOn) {
      let squaresX = Math.floor(event.pageX / (STATICS.SQUARE * zoomLevel));
      let squaresY = Math.floor(event.pageY / (STATICS.SQUARE * zoomLevel));
      setMousePosition({
        x: squaresX,
        y: squaresY
      });
      if(clicked.current && selectedTile) {
        createNewGameObject();
      }
    }
  })

  useEventListener('mousedown', (event) => {

    clicked.current = true;
    lastMousePosition.current = {x: event.clientX, y: event.clientY};

    let squaresX = Math.floor(event.pageX / (STATICS.SQUARE * zoomLevel));
    let squaresY = Math.floor(event.pageY / (STATICS.SQUARE * zoomLevel));
    setMousePosition({
      x: squaresX,
      y: squaresY
    });

    if(isTileSelectionOpen || !selectedTile || !isTileCreationOn) {
      return;
    }

    createNewGameObject();

  })

  function createNewGameObject() {


    let id = mousePosition.x?.toString() + mousePosition.y?.toString();
    if(obstaclesObject[id] || creating.current || createdTileIds.current[id]) {
      return;
    }
    let newTile = {
      positionX: mousePosition.x,
      positionY: mousePosition.y,
      isBlocking: isBlocking,
      image: selectedTile,
      onInteract: onInteract
    }
    creating.current = true;
    createdTileIds.current[id] = true;
    createGameObject({
      variables: {
        gameObject: newTile
      }
    }).then(result => {
      let data = result.data.createGameObject;
      let newObstacles = ObstacleCreator([data]);
      let action = ACTIONS.OBSTACLE_ACTIONS.ADD_OBSTACLES(newObstacles);
      dispatch(action);
      creating.current = false;
    }, (error) => {
      delete createdTileIds.current[id];
      creating.current = false;
    })
  }

  useEventListener('mouseup', (event) => {
    clicked.current = false;
  })

  useEventListener('wheel', (event) => {
    event.preventDefault();
    event.stopPropagation();
    if(event.deltaY > 0) {
      if(zoomLevel >= 0.25) {
        let action = ACTIONS.APP_ACTIONS.SET_ZOOM_LEVEL({
          zoomLevel: zoomLevel - 0.05,
          mousePosition: {
            x: event.pageX,
            y: event.pageY
          }
        });
        dispatch(action);
      }
    } else if (event.deltaY < 0) {
      if(zoomLevel <= 2) {
        let action = ACTIONS.APP_ACTIONS.SET_ZOOM_LEVEL({
          zoomLevel: zoomLevel + 0.05,
          mousePosition: {
            x: event.pageX,
            y: event.pageY
          }
        });
        dispatch(action);
      }

    }
  }, window, {passive: false})

  useQuery(GAME_OBJECT_QUERIES.GET_GAME_OBJECTS, {
    onCompleted: (data) => {
      let newObstacles = ObstacleCreator(data.gameObjects);
      let action = ACTIONS.OBSTACLE_ACTIONS.ADD_OBSTACLES(newObstacles);
      dispatch(action);
    }
  })

  useQuery(ITEM_QUERIES.GET_ITEMS, {
    onCompleted: (data) => {
      let newObstacles = ItemCreator(data.items);
      let action = ACTIONS.ITEM_ACTIONS.ADD_ITEMS(newObstacles);
      dispatch(action);
    }
  })

  function getOverlayClass() {
    return 'edit-mode-overlay' + (isTileCreationOn ? ' enabled' : '');
  }

  function getHighlightStyle() {
    return {
      opacity: isTileCreationOn ? 0.3 : 0,
      left: mousePosition.x * (STATICS.SQUARE * zoomLevel),
      top: mousePosition.y * (STATICS.SQUARE * zoomLevel)
    }
  }

  return (
    <div className={'edit-mode-container'}>
      <div className={getOverlayClass()}></div>
      <div style={getHighlightStyle()} className={'edit-mode-highlight'}></div>
      {isTileSelectionOpen ? <EditModeTileSelection/> : ''}

      <div className={'edit-mode-game-container'}>
        {obstacles}
        {items}
      </div>


    </div>
  );
}
