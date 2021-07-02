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
  } else if (action.type === ACTIONS.OBSTACLE_ACTIONS.ENUMS.ADD_OBSTACLE) {
    let existingObstacles = state.obstacles as IObstacle[];
    existingObstacles[action.payload.id] = action.payload;
    return {
      ...state,
      existingObstacles
    };
  } else if(action.type === ACTIONS.CHARACTER_ACTIONS.ENUMS.INTERACT){
    let existingObstacles = state.obstacles as IObstacle[];
    let interactedPosition: IPoint = action.payload.position;
    let interactedObstacle = Object.values(existingObstacles).find((it) => {
      return it.position.x === interactedPosition.x && it.position.y === interactedPosition.y && it.onInteract;
    });
    if(interactedObstacle) {
      interactedObstacle.onInteract();
    }
  }

  return state;

}
