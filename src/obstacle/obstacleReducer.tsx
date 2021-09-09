import { ACTIONS } from '../redux/actions';
import { IObstacle } from 'Types/obstacle';
import { IPoint } from 'Types/point';

export function ObstacleReducer(state = {obstacles: {}}, action) {
  if(action.type === ACTIONS.OBSTACLE_ACTIONS.ENUMS.SET_POSITION) {
    let obstacles = state.obstacles;
    obstacles[action.payload.id].position = action.payload.position;
    return {
      ...state,
      obstacles
    };
  } else if (action.type === ACTIONS.OBSTACLE_ACTIONS.ENUMS.ADD_OBSTACLES) {
    let newObstacles = {
      ...state.obstacles,
      ...action.payload
    };
    return {
      ...state,
      obstacles: newObstacles
    };
  } else if(action.type === ACTIONS.CHARACTER_ACTIONS.ENUMS.INTERACT){
    let existingObstacles = state.obstacles as IObstacle[];
    let interactedObstacle = Object.values(existingObstacles).find((it) => {
      return it.positionX === action.payload.positionX && it.positionY === action.payload.positionY && it.onInteract;
    });
    if(interactedObstacle) {
      interactedObstacle.onInteract();
    }
  }

  return state;

}
