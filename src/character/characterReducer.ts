import { ACTIONS } from '../redux/actions';
import { IObstacle } from 'Types/obstacle';
import { IPoint } from 'Types/obstacleCreator';

const initialState = {
  characterPosition: {
    x: 0,
    y: 0
  },
  characterDirection: 'down'
};
export function CharacterReducer(state = initialState, action) {

  let keyCodes = {
    38: onMovement('up'),
    40: onMovement('down'),
    37: onMovement('left'),
    39: onMovement('right')
  };

  if(action?.type === ACTIONS.APP_ACTIONS.KEYDOWN && Object.keys(keyCodes).map(code => parseInt(code, 10))?.includes(action?.payload?.keycode)) {
    return keyCodes[action.payload.keycode]();
  } else {
    return state;
  }

  function onMovement(direction: string) {
    return () => {
      if(direction === 'up') {
        let targetPosition = {
          x: state.characterPosition.x,
          y: state.characterPosition.y - 1
        };
        if(hasTargetPositionObstacle(targetPosition)) {
          return {...state};
        }
        return {
          ...state,
          characterPosition: targetPosition,
          characterDirection: 'up'
        };
      } else if (direction === 'down') {
        let targetPosition = {
          x: state.characterPosition.x,
          y: state.characterPosition.y + 1
        };
        if(hasTargetPositionObstacle(targetPosition)) {
          return {...state};
        }
        return {
          ...state,
          characterPosition: targetPosition,
          characterDirection: 'down'
        };
      } else if (direction === 'left') {
        let targetPosition = {
          x: state.characterPosition.x - 1,
          y: state.characterPosition.y
        };
        if(hasTargetPositionObstacle(targetPosition)) {
          return {...state};
        }
        return {
          ...state,
          characterPosition: targetPosition,
          characterDirection: 'left'

        };
      } else if (direction === 'right') {
        let targetPosition = {
          x: state.characterPosition.x + 1,
          y: state.characterPosition.y
        };
        if(hasTargetPositionObstacle(targetPosition)) {
          return {...state};
        }
        return {
          ...state,
          characterPosition: targetPosition,
          characterDirection: 'right'
        };
      } else {
        return state;
      }
    };
  }

  function hasTargetPositionObstacle(targetPosition) {
    let obstacle = getObstacleInTargetPosition(targetPosition);
    return obstacle && obstacle.isBlocking;
  }

  function getObstacleInTargetPosition(targetPosition) {
    let obstacles = Object.values(action.payload.state.ObstacleReducer.obstacles) as IObstacle[];
    let foundObstacle = obstacles.find(obstacle => {
      return obstacle.position.x === targetPosition.x && obstacle.position.y === targetPosition.y;
    });
    return foundObstacle;
  }
}
