import { IObstacle } from 'Types/obstacle';
import { ACTIONS } from './redux/actions';
import { APP_ACTIONS } from './appActions';
import { STATICS } from './enums/statics';

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
  if(isMovementAction(action)) {
    checkCenteringAndScroll(action);
  }

  return {...state};


  function checkCenteringAndScroll(usedAction: any) {
    let directionOffset = {
      37: {x: -STATICS.SQUARE, y: 0},
      38: {x: STATICS.SQUARE, y: 0},
      39: {x: 0, y: -STATICS.SQUARE},
      40: {x: 0, y: STATICS.SQUARE},
    };

    let character = $('.character');
    let scrollLeft = html.scrollLeft();
    let scrollTop = html.scrollTop();
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let centerFromLeft = screenWidth / 2 + scrollLeft;
    let centerFromTop = screenHeight / 2 + scrollTop;
    let characterPosition = character.offset();
    characterPosition.left += directionOffset[usedAction.payload.keycode].x;
    characterPosition.top += directionOffset[usedAction.payload.keycode].y;
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
    }, 200);
  }

  function hasTargetPositionObstacle(targetPosition) {
    let obstacles: IObstacle[] = Object.values(action.payload.obstacles);
    let hasObstacle = obstacles.find(obstacle => {
      return obstacle.position.x === targetPosition.x && obstacle.position.y === targetPosition.y;
    });
    return hasObstacle && hasObstacle.isBlocking;
  }

  function isMovementAction(newAction: any) {
    return [37, 38, 39, 40].includes(newAction?.payload?.keycode);
  }

}
