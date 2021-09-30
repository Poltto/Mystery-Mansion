export const APP_ACTIONS = {
  KEYDOWN: 'keydown',
  KEYUP: 'keyup',
  ENUMS: {
    SET_POSITION_UP: 'GLOBAL_SET_POSITION_UP',
    SET_POSITION_DOWN: 'GLOBAL_SET_POSITION_DOWN',
    SET_POSITION_LEFT: 'GLOBAL_SET_POSITION_LEFT',
    SET_POSITION_RIGHT: 'GLOBAL_SET_POSITION_RIGHT',
    SET_ZOOM_LEVEL: 'SET_ZOOM_LEVEL'
  },

  SET_ZOOM_LEVEL: ({zoomLevel, mousePosition}) => {
    return {
      type: APP_ACTIONS.ENUMS.SET_ZOOM_LEVEL,
      payload: {
        zoomLevel,
        mousePosition
      }
    }
  }
};


