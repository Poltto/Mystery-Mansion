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
      37: {x: -1, y: 0},
      38: {x: 0, y: -1},
      39: {x: 1, y: 0},
      40: {x: 0, y: 1},
    };
    let leftOffsetInSquares = directionOffset[usedAction.payload.keycode].x;
    let verticalOffsetInSquares = directionOffset[usedAction.payload.keycode].y;
    let characterPosition = usedAction.payload.characterPosition;

    let scrollLeft = html.scrollLeft();
    let scrollTop = html.scrollTop();

    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    let screenWidthInSquares = screenWidth / STATICS.SQUARE;
    let screenHeightInSquares = screenHeight / STATICS.SQUARE;

    let centerFromLeft = screenWidth / 2 + scrollLeft;
    let centerFromTop = screenHeight / 2 + scrollTop;

    let squaresFromLeft = centerFromLeft / STATICS.SQUARE;
    let squaresFromTop = centerFromTop / STATICS.SQUARE;

    let shouldScrollLeft = (characterPosition.x + leftOffsetInSquares) < squaresFromLeft && scrollLeft !== 0;
    let shouldScrollRight = (characterPosition.x + leftOffsetInSquares) > squaresFromLeft;
    let shouldScrollTop = (characterPosition.y + verticalOffsetInSquares) < squaresFromTop && scrollTop !== 0;
    let shouldScrollBottom = (characterPosition.y + verticalOffsetInSquares) > squaresFromTop;

    let horizontalScroll = scrollLeft;
    let verticalScroll = scrollTop;

    let horizontalCenter = characterPosition.x - (screenWidthInSquares / 2) + leftOffsetInSquares;
    let verticalCenter = characterPosition.y - (screenHeightInSquares / 2) + verticalOffsetInSquares;


    if(shouldScrollLeft || shouldScrollRight) {
      horizontalScroll = horizontalCenter * STATICS.SQUARE;
    }

    if (shouldScrollTop || shouldScrollBottom) {
      verticalScroll = verticalCenter * STATICS.SQUARE;
    }
    return scrollBodyTo(horizontalScroll, verticalScroll);
  }

  function scrollBodyTo(x: number, y: number) {
    html.animate({
      scrollTop: y,
      scrollLeft: x
    }, 270, 'linear');
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
