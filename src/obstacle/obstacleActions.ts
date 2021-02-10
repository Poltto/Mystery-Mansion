export const OBSTACLE_ACTIONS = {

  ENUMS: {
    SET_POSITION: 'SET_POSITION',
    ADD_OBSTACLE: 'ADD_OBSTACLE'
  },

  SET_POSITION: (obstaclePosition) => {
    return {
      type: OBSTACLE_ACTIONS.ENUMS.SET_POSITION,
      payload: obstaclePosition
    };
  },

  ADD_OBSTACLE: (obstacle) => {
    return {
      type: OBSTACLE_ACTIONS.ENUMS.ADD_OBSTACLE,
      payload: obstacle
    };
  }

};
