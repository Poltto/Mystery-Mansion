import {useDispatch, useSelector} from "react-redux";
import {ACTIONS} from "../redux/actions";
import {RootState} from "../redux/reducers";

export function EditModeTileSelection() {
    let OBSTACLE_STATICS = require('Helpers/statics.obstacles.ts');
    let obstacleTypes = OBSTACLE_STATICS.TEXTURES;
    const dispatch = useDispatch();

    const selectedTile = useSelector((state: RootState) => {
        return state.EditModeReducer.selectedTile;
    });

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
                <input type={'radio'} value={true} name={'isBlocking'}/> True
                <input type={'radio'} value={false} name={'isBlocking'}/> False
            </div>
        </div>
    )
}