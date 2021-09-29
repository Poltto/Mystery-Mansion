import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/reducers";
import {useEffect} from "react";
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

export function EditMode() {

    const [createGameObject, {data, loading, error}] = useMutation(GAME_OBJECT_MUTATIONS.CREATE_GAME_OBJECT);

    const dispatch = useDispatch();

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

    useEventListener('click', (event) => {
        if(isTileSelectionOpen || !selectedTile) {
            return;
        }

        let squaresX = Math.floor(event.clientX / STATICS.SQUARE);
        let squaresY = Math.floor(event.clientY / STATICS.SQUARE);
        let id = squaresX?.toString() + squaresY?.toString();
        if(obstaclesObject[id]) {
            return;
        }
        let newTile = {
            positionX: squaresX,
            positionY: squaresY,
            isBlocking: isBlocking,
            image: selectedTile,
            onInteract: onInteract
        }

        createGameObject({
            variables: {
                gameObject: newTile
            }
        }).then(result => {
            let data = result.data.createGameObject;
            let newObstacles = ObstacleCreator([data]);
            let action = ACTIONS.OBSTACLE_ACTIONS.ADD_OBSTACLES(newObstacles);
            dispatch(action);
        })
    });

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
    return (
        <div className={'edit-mode-container'}>
            <div className={'edit-mode-overlay'}></div>
            {isTileSelectionOpen ? <EditModeTileSelection/> : ''}

            <div className={'edit-mode-game-container'}>
                {obstacles}
                {items}
            </div>


        </div>
    );
}
