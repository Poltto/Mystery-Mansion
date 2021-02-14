import { useDispatch, useSelector } from 'react-redux';
import { useEventListener } from '../use-event-listener';
import { ACTIONS } from '../redux/actions';
import { store } from '../redux/store';
import { APP_ACTIONS } from '../appActions';
import { useState } from 'react';
import { IPoint } from 'Types/obstacleCreator';
import { IObstacle } from 'Types/obstacle';
export function Character() {
  const characterPosition = useSelector(state => {
    return state.CharacterReducer.characterPosition;
  });
  const dispatch = useDispatch();
  const [lastDirection, setLastDirection] = useState('down');

  let directions = {
    38: 'up',
    40: 'down',
    37: 'left',
    39: 'right'
  };

  let keyCodes = {
    38: onMovement('up'),
    40: onMovement('down'),
    37: onMovement('left'),
    39: onMovement('right'),
    81: onSimpleInteract
  };



  function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
  }

  useEventListener('keydown', onKeydown);

  function onKeydown(event) {
    let callback = keyCodes[event.keyCode];
    if(Object.keys(directions).includes(event.keyCode.toString())) {
      setLastDirection(directions[event.keyCode]);
    }

    if(isFunction(callback)) {
      callback();
    }
  }

  function onSimpleInteract() {
    let targetPosition: IPoint = returnPositionInDirection(characterPosition, lastDirection, 1);
    let obstacles = store.getState().ObstacleReducer.obstacles as IObstacle[];
    let interactedObstacle = Object.values(obstacles).find((it) => {
      return it.position.x === targetPosition.x && it.position.y === targetPosition.y && it.onInteract;
    });
    if(interactedObstacle?.onInteract) {
      interactedObstacle.onInteract();
    }
  }

  function onMovement(direction) {
    let actions = {
      up: ACTIONS.CHARACTER_ACTIONS.SET_POSITION_UP(direction),
      down: ACTIONS.CHARACTER_ACTIONS.SET_POSITION_DOWN(direction),
      left: ACTIONS.CHARACTER_ACTIONS.SET_POSITION_LEFT(direction),
      right: ACTIONS.CHARACTER_ACTIONS.SET_POSITION_RIGHT(direction)
    };
    let appActions = {
      up: APP_ACTIONS.ENUMS.SET_POSITION_UP,
      down: APP_ACTIONS.ENUMS.SET_POSITION_DOWN,
      left: APP_ACTIONS.ENUMS.SET_POSITION_LEFT,
      right: APP_ACTIONS.ENUMS.SET_POSITION_RIGHT
    };
    let action = actions[direction];

    return () => {
      action.payload.obstacles = store.getState().ObstacleReducer.obstacles;
      dispatch(action);
      action.type = appActions[direction];
      return dispatch(action);
    };
  }

  function getStyle() {
    if(!characterPosition) {
      return {};
    } else {
      let styles = {
        left: characterPosition?.x * 30,
        top: characterPosition?.y * 30
      };
      return styles;
    }
  }

  function getClass() {
    let icons = {
      down: 'icon-arrow-down',
      up: 'icon-arrow-up',
      left: 'icon-arrow-back',
      right: 'icon-arrow-forward',
    };
    return 'icon ' + icons[lastDirection];
  }

  function returnPositionInDirection(position: IPoint, direction: string, times: number = 1) {
    if(direction === 'up') {
      return {
        x: position.x,
        y: position.y - times
      };
    } else if (direction === 'right') {
      return {
        x: position.x + times,
        y: position.y
      };
    } else if (direction === 'left') {
      return {
        x: position.x - times,
        y: position.y
      };
    } else if (direction === 'down') {
      return {
        x: position.x,
        y: position.y + times
      };
    }
  }

  return (<div style={getStyle()} className={'character'} ><span className={getClass()}></span></div>);
}
