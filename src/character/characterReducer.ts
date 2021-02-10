import { ACTIONS } from '../redux/actions';
import { IObstacle } from 'Types/obstacle';

const initialState = {
  characterPosition: {
    x: 0,
    y: 0
  }
};
export function CharacterReducer(state = initialState, action) {
  if(action.type === ACTIONS.CHARACTER_ACTIONS.ENUMS.SET_POSITION_DOWN) {
    let targetPosition = {
      x: state.characterPosition.x,
      y: state.characterPosition.y + 1
    };
    if(hasTargetPositionObstacle(targetPosition)) {
      return {...state};
    }
    return {
      ...state,
      characterPosition: targetPosition
    };
  } else if(action.type === ACTIONS.CHARACTER_ACTIONS.ENUMS.SET_POSITION_UP) {
    let targetPosition = {
      x: state.characterPosition.x,
      y: state.characterPosition.y - 1
    };
    if(hasTargetPositionObstacle(targetPosition)) {
      return {...state};
    }
    return {
      ...state,
      characterPosition: targetPosition
    };
  } else if(action.type === ACTIONS.CHARACTER_ACTIONS.ENUMS.SET_POSITION_LEFT) {
    let targetPosition = {
      x: state.characterPosition.x - 1,
      y: state.characterPosition.y
    };
    if(hasTargetPositionObstacle(targetPosition)) {
      return {...state};
    }
    return {
      ...state,
      characterPosition: targetPosition
    };
  } else if(action.type === ACTIONS.CHARACTER_ACTIONS.ENUMS.SET_POSITION_RIGHT) {
    let targetPosition = {
      x: state.characterPosition.x + 1,
      y: state.characterPosition.y
    };
    if(hasTargetPositionObstacle(targetPosition)) {
      return {...state};
    }
    return {
      ...state,
      characterPosition: targetPosition
    };
  } else {
    return state;
  }

  function hasTargetPositionObstacle(targetPosition) {
    let obstacles: IObstacle[] = Object.values(action.payload.obstacles);
    let hasObstacle = obstacles.find(obstacle => {
      return obstacle.position.x === targetPosition.x && obstacle.position.y === targetPosition.y;
    });
    return hasObstacle && hasObstacle.isBlocking;
  }

  function isMovementAction(newAction: string) {
    return newAction in [ACTIONS.CHARACTER_ACTIONS.ENUMS, ACTIONS.CHARACTER_ACTIONS.ENUMS.SET_POSITION_LEFT, ACTIONS.CHARACTER_ACTIONS.ENUMS.SET_POSITION_UP, ACTIONS.CHARACTER_ACTIONS.ENUMS.SET_POSITION_UP];
  }

}
