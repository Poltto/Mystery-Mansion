import { IObstacle } from 'Types/obstacle';
import { ACTIONS } from './redux/actions';
import { APP_ACTIONS } from './appActions';

const initialState = {
  characterPosition: {
    x: 0,
    y: 0
  }
};
export function AppReducer(state = initialState, action) {
  let body = $('body');
  let html = $('html');
  let main = $('.main-container');
  if(isMovementAction(action.type)) {

    checkCenteringAndScroll();
  }

  return {...state};


  function checkCenteringAndScroll() {

    let character = $('.character');
    let scrollLeft = html.scrollLeft();
    let scrollTop = html.scrollTop();
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let centerFromLeft = screenWidth / 2 + scrollLeft;
    let centerFromTop = screenHeight / 2 + scrollTop;
    let characterPosition = character.offset();
    let distancePastHorizontalCenter = characterPosition.left  - centerFromLeft;
    let distancePastVerticalCenter = characterPosition.top  - centerFromTop;
    if(distancePastHorizontalCenter > 0 || (distancePastHorizontalCenter < 0 && scrollLeft > 0)) {
      return scrollBodyTo(scrollLeft + distancePastHorizontalCenter, scrollTop);
    }

    if(distancePastVerticalCenter > 0 || (distancePastVerticalCenter < 0 && html.scrollTop() > 0)) {
      return scrollBodyTo(scrollLeft, scrollTop + distancePastVerticalCenter);
    }
  }

  function scrollBodyTo(x: number, y: number) {
    html.animate({
      scrollTop: y,
      scrollLeft: x
    }, 50);
  }

  function hasTargetPositionObstacle(targetPosition) {
    let obstacles: IObstacle[] = Object.values(action.payload.obstacles);
    let hasObstacle = obstacles.find(obstacle => {
      return obstacle.position.x === targetPosition.x && obstacle.position.y === targetPosition.y;
    });
    return hasObstacle && hasObstacle.isBlocking;
  }

  function isMovementAction(newAction: string) {
    return [APP_ACTIONS.ENUMS.SET_POSITION_RIGHT, APP_ACTIONS.ENUMS.SET_POSITION_LEFT, APP_ACTIONS.ENUMS.SET_POSITION_UP, APP_ACTIONS.ENUMS.SET_POSITION_DOWN].includes(newAction);
  }

}
