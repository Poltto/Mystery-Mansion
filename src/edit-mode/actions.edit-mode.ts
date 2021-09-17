export const EDIT_MODE_ACTIONS = {

    ENUMS: {
        SELECT_TILE: 'SELECT_TILE',
        TOGGLE_TILE_SELECTION: 'TOGGLE_TILE_SELECTION',
        TOGGLE_IS_BLOCKING: 'TOGGLE_IS_BLOCKING'
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

    TOGGLE_IS_BLOCKING: (payload: {isBlocking: boolean}) => {
        return {
            type: EDIT_MODE_ACTIONS.ENUMS.TOGGLE_TILE_SELECTION,
            payload
        };
    }
};
