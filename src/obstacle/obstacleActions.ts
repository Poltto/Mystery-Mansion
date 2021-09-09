export const OBSTACLE_ACTIONS = {

  ENUMS: {
    SET_POSITION: 'SET_POSITION',
    ADD_OBSTACLES: 'ADD_OBSTACLES'
  },

  SET_POSITION: (obstaclePosition) => {
    return {
      type: OBSTACLE_ACTIONS.ENUMS.SET_POSITION,
      payload: obstaclePosition
    };
  },

  ADD_OBSTACLES: (obstacles) => {
    return {
      type: OBSTACLE_ACTIONS.ENUMS.ADD_OBSTACLES,
      payload: obstacles
    };
  }

};
