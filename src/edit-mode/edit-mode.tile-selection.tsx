import {useDispatch, useSelector} from "react-redux";
import {ACTIONS} from "../redux/actions";
import {RootState} from "../redux/reducers";
import { useState } from 'react';
import { CustomInput, CustomRadio } from '../elements/elements';

export function EditModeTileSelection() {
    let OBSTACLE_STATICS = require('Helpers/statics.obstacles.ts');
    let ITEM_STATICS = require('Helpers/statics.items.ts');
    let obstacleTypes = OBSTACLE_STATICS.TEXTURES;
    let itemTypes = ITEM_STATICS.TEXTURES;
    const dispatch = useDispatch();


    const selectedTile = useSelector((state: RootState) => {
        return state.EditModeReducer.selectedTile;
    });

    const isBlocking = useSelector((state: RootState) => {
        return state.EditModeReducer.isBlocking;
    });

    const name = useSelector((state: RootState) => {
        return state.EditModeReducer.name;
    });

    const onInteract = useSelector((state: RootState) => {
        return state.EditModeReducer.onInteract;
    });

    const selectedTileType = useSelector((state: RootState) => {
        return state.EditModeReducer.tileType;
    })

    function setIsBlocking(value: boolean) {
        let action = ACTIONS.EDIT_MODE_ACTIONS.SET_IS_BLOCKING({isBlocking: value});
        dispatch(action);
    }

    function setName(value: string) {
        let action = ACTIONS.EDIT_MODE_ACTIONS.SET_NAME({name: value});
        dispatch(action);
    }

    function selectTile(type: string) {
        return () => {
            let action = ACTIONS.EDIT_MODE_ACTIONS.SELECT_TILE(type);
            dispatch(action);
        }
    }

    function selectTileType(type: string) {
        return () => {
            if(type === selectedTileType) {
                return;
            }
            let action = ACTIONS.EDIT_MODE_ACTIONS.SELECT_TILE_TYPE({type});
            dispatch(action);
        }
    }

    function getTileStyle(type) {
        let className = 'single-obstacle-type';
        return selectedTile === type ? className + ' selected' : className;
    }

    function getTileContainerStyle(type: string) {
        return 'edit-mode-tile-container-section' + (selectedTileType === type ? ' selected' : '');
    }

    function closeTileSelection() {
        let action = ACTIONS.EDIT_MODE_ACTIONS.TOGGLE_TILE_SELECTION();
        dispatch(action);
    }


    return (
        <div className={'edit-mode-tile-container'}>
            <div className={'close-tile-selection-container'}>
                <span className={'icon-cross'} onClick={closeTileSelection}></span>
            </div>
            <div onClick={selectTileType('gameObject')} className={getTileContainerStyle('gameObject')}>
                <div className={'edit-mode-tile-container-inner-section'} >
                    {Object.values(obstacleTypes).map((type: string) => {
                        return <div onClick={selectTile(type)} key={type} className={getTileStyle(type)}><img src={type}/></div>
                    })}
                </div>



                <div className={'edit-mode-tile-container-inner-section'}>
                    <CustomRadio value={isBlocking} setValue={setIsBlocking} direction={'vertical'} values={[true, false]} labels={['Blocking', 'Not blocking']}/>
                </div>
            </div>


            <div onClick={selectTileType('item')} className={getTileContainerStyle('item')}>
                <div className={'edit-mode-tile-container-inner-section'}>
                    {Object.values(itemTypes).map((type: string) => {
                        return <div onClick={selectTile(type)} key={type} className={getTileStyle(type)}><img src={type}/></div>
                    })}
                </div>
                <div className={'edit-mode-tile-container-inner-section'}>
                    <CustomInput label={'Name'} value={name} setValue={setName}/>
                </div>
                <div className={'edit-mode-tile-container-inner-section'}>
                    <CustomInput label={'Function-name'} value={onInteract} setValue={setName}/>
                </div>


            </div>
        </div>
    )
}
