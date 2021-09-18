export const EDIT_MODE_ACTIONS = {

    ENUMS: {
        SELECT_TILE: 'SELECT_TILE',
        TOGGLE_TILE_SELECTION: 'TOGGLE_TILE_SELECTION',
        SET_IS_BLOCKING: 'SET_IS_BLOCKING',
        SET_NAME: 'SET_NAME',
        SELECT_TILE_TYPE: 'SELECT_TILE_TYPE',
        SET_ON_INTERACT: 'SET_ON_INTERACT'
    },

    SELECT_TILE: (tile) => {
        return {
            type: EDIT_MODE_ACTIONS.ENUMS.SELECT_TILE,
            payload: tile
        };
    },

    TOGGLE_TILE_SELECTION: () => {
        return {
            type: EDIT_MODE_ACTIONS.ENUMS.TOGGLE_TILE_SELECTION
        };
    },

    SET_IS_BLOCKING: (payload: {isBlocking: boolean}) => {
        return {
            type: EDIT_MODE_ACTIONS.ENUMS.SET_IS_BLOCKING,
            payload
        };
    },

    SET_NAME: (payload: {name: string}) => {
        return {
            type: EDIT_MODE_ACTIONS.ENUMS.SET_NAME,
            payload
        };
    },

    SELECT_TILE_TYPE: (payload: {type: string}) => {
        return {
            type: EDIT_MODE_ACTIONS.ENUMS.SELECT_TILE_TYPE,
            payload
        };
    },

    SET_ON_INTERACT: (payload: {onInteract: string}) => {
        return {
            type: EDIT_MODE_ACTIONS.ENUMS.SET_ON_INTERACT,
            payload
        };
    }
};
