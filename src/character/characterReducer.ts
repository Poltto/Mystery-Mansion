import { ACTIONS } from '../redux/actions';
import { IObstacle } from 'Types/obstacle';
import { IPoint } from 'Types/point';
const initialState = {
  characterPosition: {
    positionX: 0,
    positionY: 0
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
    return {...state};
  }

  function onMovement(direction: string) {
    return () => {
      if(direction === 'up') {
        let targetPosition = {
          positionX: state.characterPosition.positionX,
          positionY: state.characterPosition.positionY - 1
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
          positionX: state.characterPosition.positionX,
          positionY: state.characterPosition.positionY + 1
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
          positionX: state.characterPosition.positionX - 1,
          positionY: state.characterPosition.positionY
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
          positionX: state.characterPosition.positionX + 1,
          positionY: state.characterPosition.positionY
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
    return obstacle && obstacle.props.isBlocking;
  }

  function getObstacleInTargetPosition(targetPosition) {
    let targetKey = targetPosition.positionX?.toString() + targetPosition.positionY?.toString();
    let foundObstacle = action.payload.state.ObstacleReducer.obstacles[targetKey];
    return foundObstacle;
  }
}
