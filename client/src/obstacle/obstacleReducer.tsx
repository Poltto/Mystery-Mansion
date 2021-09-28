import { ACTIONS } from '../redux/actions';
import { IObstacle } from 'Types/obstacle';
import { IPoint } from 'Types/point';

export function ObstacleReducer(state = {obstacles: {}}, action) {
  if(action.type === ACTIONS.OBSTACLE_ACTIONS.ENUMS.SET_POSITION) {
    let obstacles = state.obstacles;
    obstacles[action.payload.id].positionX = action.payload.positionX;
    obstacles[action.payload.id].positionY = action.payload.positionY;
    return {
      ...state,
      obstacles
    };
  } else if (action.type === ACTIONS.OBSTACLE_ACTIONS.ENUMS.ADD_OBSTACLES) {
    let newObstacles = {...state.obstacles, ...action.payload};
    return {
      ...state,
      obstacles: newObstacles
    };
  } else if(action.type === ACTIONS.CHARACTER_ACTIONS.ENUMS.INTERACT){
    let interactedObstacle = state.obstacles[action.payload.id];
    if(interactedObstacle) {
      interactedObstacle.onInteract();
    }
  }

  return state;

}
