import {useDispatch, useSelector} from "react-redux";
import {ACTIONS} from "../redux/actions";
import {RootState} from "../redux/reducers";
import { useState } from 'react';
import { CustomInput, CustomRadio } from '../elements/elements';

export function EditModeTileSelection() {
    let OBSTACLE_STATICS = require('Helpers/statics.obstacles.ts');
    let obstacleTypes = OBSTACLE_STATICS.TEXTURES;
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

    function getStyle(type) {
        let className = 'single-obstacle-type';
        return selectedTile === type ? className + ' selected' : className;
    }


    return (
        <div className={'edit-mode-tile-container'}>
            <div className={'edit-mode-tile-container-section'}>
                {Object.values(obstacleTypes).map((type: string) => {
                    return <div onClick={selectTile(type)} key={type} className={getStyle(type)}><img src={type}/></div>
                })}

            </div>
            <div className={'edit-mode-tile-container-section'}>
                <CustomRadio value={isBlocking} setValue={setIsBlocking} direction={'horizontal'} values={[true, false]} labels={['Blocking', 'Not blocking']}/>
            </div>

            <div className={'edit-mode-tile-container-section'}>
                <CustomInput label={'Name'} value={name} setValue={setName}/>
            </div>
        </div>
    )
}
