import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useEventListener } from '../use-event-listener';
import { ACTIONS } from '../redux/actions';
import { store } from '../redux/store';
import { IPoint } from 'Types/point';
import { IObstacle } from 'Types/obstacle';
import { useSelector } from 'react-redux';
import { IItem, IItemElement } from 'Types/item';
import { ITEM_INTERACTIONS } from 'Helpers/interactions.items';
import { Item } from '../endpoints/endpoint.item';
import { KEYMAP } from 'Helpers/statics.keymap';
import { useLocation } from 'react-router-dom'
import {RootState} from "../redux/reducers";
import { useMutation } from '@apollo/client';
import { ITEM_MUTATIONS } from '../graphql/mutations/graphql.mutations.item';

const INTERACTIONS = require('Helpers/statics.interactions');
export function ClickListener() {
  const location = useLocation();
  const dispatch = useDispatch();
  const characterRef = useRef({keysDown: [], lastMovement: new Date(), movementPhase: 0});
  const [pickUpItem, {data, loading, error}] = useMutation(ITEM_MUTATIONS.PICK_UP_ITEM);
  const obstacles = useSelector((state: RootState) => {
    return state.ObstacleReducer.obstacles;
  });
  const items: IItemElement[] = useSelector((state: RootState) => {
    return state.ItemReducer.items;
  });
  const characterDirection = useSelector((state: RootState) => {
    return state.CharacterReducer.characterDirection;
  });
  const characterPosition = useSelector((state: RootState) => {
    clearInterval(interval);
    return state.CharacterReducer.characterPosition;
  });

  const isTileSelectionOpen = useSelector((state: RootState) => {
    return state.EditModeReducer.isTileSelectionOpen;
  });

  let interval;

  useEffect(() => {
    interval = setInterval(() => {
      if(characterRef.current.keysDown.length) {
        if(new Date().getTime() - characterRef.current.lastMovement.getTime() < 290) {
          return;
        }
        characterRef.current.lastMovement = new Date();
        doDispatch('keydown');
      }
    }, 20);
  }, [characterPosition]);

  useEventListener('dblclick', (event) => {
    let path = event.path;
    let targetInventorySlot = path.find(element => {
      return element?.className?.includes('inventory-slot');
    });
    if(targetInventorySlot) {
      // let action = ACTIONS.ITEM_ACTIONS.TOGGLE_SELECTED_ON_ITEM_SLOT();
    }
  });

  useEventListener('keydown', (event) => {
    if(event.keyCode === KEYMAP.INTERACT) {
      onSimpleInteract();
    } else if (event.keyCode === KEYMAP.INVENTORY) {
      if(isTileSelectionOpen) {
        return;
      }
      onToggleInventory();
    } else if (event.keyCode === KEYMAP.TILE_CREATION) {
      onToggleTileCreation();
    } else if (event.keyCode === KEYMAP.TILE_SELECTION) {
      onToggleTileSelection();
    } else {
      let index = characterRef.current.keysDown.findIndex(item => item === event.keyCode);
      if(characterRef.current.keysDown.length && index === characterRef.current.keysDown.length - 1) {
        return;
      }
      if(index !== -1) {
        characterRef.current.keysDown.splice(index, 1);
      }
      characterRef.current.keysDown.push(event.keyCode);

      if(new Date().getTime() - characterRef.current.lastMovement.getTime() < 290) {
        return;
      }
      doDispatch('keydown');
      characterRef.current.lastMovement = new Date();
    }
  });

  useEventListener('keyup', (event) => {

    let index = characterRef.current.keysDown.findIndex(item => {
      return item === event.keyCode;
    });
    if(index > -1) {
      characterRef.current.keysDown.splice(index, 1);
    }
  });

  function onToggleInventory() {
    doDispatch(ACTIONS.ITEM_ACTIONS.ENUMS.TOGGLE);
  }

  function onToggleTileCreation() {
    console.log("Triggering");
    if(location.pathname === '/edit-mode') {
      let action = ACTIONS.EDIT_MODE_ACTIONS.TOGGLE_TILE_CREATION();
      dispatch(action);
    }
  }

  function onToggleTileSelection() {
    if(location.pathname === '/edit-mode') {
      let action = ACTIONS.EDIT_MODE_ACTIONS.TOGGLE_TILE_SELECTION();
      dispatch(action);
    }
  }

  function onSimpleInteract() {
    let targetPosition: IPoint = returnPositionInDirection(characterPosition, characterDirection, 1);
    // let interactedObstacle = Object.values(obstacles).find((it) => {
    //   return it.id === targetPositionX && it.position.y === targetPosition.y && it.onInteract;
    // });
    let key = targetPosition.positionX?.toString() + targetPosition.positionY?.toString();
    let interactedObstacle = obstacles[key];
    let interactedItem: IItemElement = Object.values(items).find(it => {
      return it.props.positionX === targetPosition.positionX && it.props.positionY === targetPosition.positionY;
    });
    if(interactedObstacle?.props.onInteract) {
      dispatch(interactedObstacle.onInteract());
    } else if(interactedItem?.props.onInteract) {
      if(interactedItem.props.onInteract === INTERACTIONS.PICK_UP_ITEM) {
        pickUpItem({
          variables: {
            id: interactedItem.props.id
          }
        }).then((data: any) => {
          let inventoryItemAction = ACTIONS.ITEM_ACTIONS.ADD_INVENTORY_ITEM(data.data.pickUpItem.inventoryItem);
          let itemSlotAction = ACTIONS.ITEM_ACTIONS.UPDATE_ITEM_SLOT(data.data.pickUpItem);
          let itemAction = ACTIONS.ITEM_ACTIONS.UPDATE_ITEMS([data.data.pickUpItem.inventoryItem.item]);
          dispatch(inventoryItemAction);
          dispatch(itemSlotAction);
          dispatch(itemAction);
        }, error => {
          console.log("ERROR: ", error);
        });
      } else {
        dispatch(ITEM_INTERACTIONS[interactedItem.props.onInteract]([interactedItem]));
      }
    }
  }

  function returnPositionInDirection(position: IPoint, direction: string, times: number = 1) {
    if(direction === 'up') {
      return {
        positionX: position.positionX,
        positionY: position.positionY - times
      };
    } else if (direction === 'right') {
      return {
        positionX: position.positionX + times,
        positionY: position.positionY
      };
    } else if (direction === 'left') {
      return {
        positionX: position.positionX - times,
        positionY: position.positionY
      };
    } else if (direction === 'down') {
      return {
        positionX: position.positionX,
        positionY: position.positionY + times
      };
    }
  }

  function doDispatch(type: string) {
    let currentState = store.getState();
    let action = {
      type,
      payload: {
        keycode: characterRef.current.keysDown[characterRef.current.keysDown.length - 1],
        state: currentState,
        characterPosition
      }
    };
    dispatch(action);
  }

  return (
    <React.Fragment/>
  );
}
