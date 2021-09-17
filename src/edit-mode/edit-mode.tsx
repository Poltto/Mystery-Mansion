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

export function EditMode() {


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
            onInteract: null
        }

        GameObject.create(newTile).then(result => {
            result.json().then(resultJSON => {
                let newObstacles = ObstacleCreator([resultJSON]);
                let action = ACTIONS.OBSTACLE_ACTIONS.ADD_OBSTACLES(newObstacles);
                dispatch(action);
            })
        })
    });

    useEffect(() => {
        GameObject.get().then((result) => {
            result.json().then((jsonResult) => {
                let newObstacles = ObstacleCreator(jsonResult);
                let action = ACTIONS.OBSTACLE_ACTIONS.ADD_OBSTACLES(newObstacles);
                dispatch(action);
            });
        });

        Item.get().then((result) => {
            result.json().then((jsonResult) => {
                let newItems = ItemCreator(jsonResult);
                let action = ACTIONS.ITEM_ACTIONS.ADD_ITEMS(newItems);
                dispatch(action);
            });
        });
    }, []);

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
