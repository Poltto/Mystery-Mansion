import {EDIT_MODE_ACTIONS} from "./actions.edit-mode";

export function EditModeReducer(state = {isTileCreationOn: false, onInteract: '', tileType: 'gameObject', name: '', selectedTile: null, isTileSelectionOpen: false, isBlocking: true}, action) {
    if(action.type === EDIT_MODE_ACTIONS.ENUMS.SELECT_TILE) {
        let tile = action.payload;
        state.selectedTile = tile;
    } else if (action.type === EDIT_MODE_ACTIONS.ENUMS.TOGGLE_TILE_SELECTION) {
        state.isTileSelectionOpen = !state.isTileSelectionOpen;
    } else if (action.type === EDIT_MODE_ACTIONS.ENUMS.SET_IS_BLOCKING) {
        state.isBlocking = action.payload.isBlocking;
    } else if (action.type === EDIT_MODE_ACTIONS.ENUMS.SET_NAME) {
        state.name = action.payload.name;
    } else if (action.type === EDIT_MODE_ACTIONS.ENUMS.SELECT_TILE_TYPE) {
        state.tileType = action.payload.type;
        state.onInteract = 'void';
        state.name = '';
    } else if (action.type === EDIT_MODE_ACTIONS.ENUMS.SET_ON_INTERACT) {
        state.onInteract = action.payload.onInteract;
    } else if (action.type === EDIT_MODE_ACTIONS.ENUMS.TOGGLE_TILE_CREATION) {
        state.isTileCreationOn = !state.isTileCreationOn;
    }
    return state;

}
