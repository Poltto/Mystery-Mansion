import { IPoint } from 'Types/point';

export const CHARACTER_ACTIONS = {

  ENUMS: {
    SET_POSITION_UP: 'SET_POSITION_UP',
    SET_POSITION_DOWN: 'SET_POSITION_DOWN',
    SET_POSITION_LEFT: 'SET_POSITION_LEFT',
    SET_POSITION_RIGHT: 'SET_POSITION_RIGHT',
    INTERACT: 'INTERACT'
  },

  INTERACT: (position: IPoint) => {
    return {
      type: 'INTERACT',
      payload: {
        position
      }
    };
  },

  SET_POSITION_UP: (characterPosition) => {
    return {
      type: 'SET_POSITION_UP',
      payload: {
        direction: characterPosition
      }
    };
  },

  SET_POSITION_DOWN: (characterPosition) => {
    return {
      type: 'SET_POSITION_DOWN',
      payload: {
        direction: characterPosition
      }
    };
  },

  SET_POSITION_LEFT: (characterPosition) => {
    return {
      type: 'SET_POSITION_LEFT',
      payload: {
        direction: characterPosition
      }
    };
  },

  SET_POSITION_RIGHT: (characterPosition) => {
    return {
      type: 'SET_POSITION_RIGHT',
      payload: {
        direction: characterPosition
      }
    };
  }
};
