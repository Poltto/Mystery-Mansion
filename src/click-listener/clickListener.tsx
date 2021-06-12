import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useEventListener } from '../use-event-listener';
import { ACTIONS } from '../redux/actions';
import { store } from '../redux/store';
import { IPoint } from 'Types/obstacleCreator';
import { IObstacle } from 'Types/obstacle';
import { useSelector } from 'react-redux';

export function ClickListener() {

  const dispatch = useDispatch();
  const characterRef = useRef({keysDown: [], lastMovement: new Date(), movementPhase: 0});
  const obstacles: IObstacle[] = useSelector(state => {
    return state.ObstacleReducer.obstacles;
  });
  const characterDirection = useSelector(state => {
    return state.CharacterReducer.characterDirection;
  });
  const characterPosition = useSelector(state => {
    return state.CharacterReducer.characterPosition;
  });

  useEffect(() => {
    setInterval(() => {
      if(characterRef.current.keysDown.length) {
        if(new Date().getTime() - characterRef.current.lastMovement.getTime() < 290) {
          return;
        }
        characterRef.current.lastMovement = new Date();
        doDispatch('keydown');
      }
    }, 20);
  }, []);


  useEventListener('keydown', (event) => {
    if(event.keyCode === 81) {
      onSimpleInteract();
    } else {
      let index = characterRef.current.keysDown.findIndex(item => item === event.keyCode);
      if(characterRef.current.keysDown.length && index === characterRef.current.keysDown.length - 1) {
        return;
      }
      if(index !== -1) {
        characterRef.current.keysDown.splice(index, 1);
      }
      characterRef.current.keysDown.push(event.keyCode);

      if(new Date().getTime() - characterRef.current.lastMovement.getTime() < 290) {
        return;
      }
      doDispatch('keydown');
      characterRef.current.lastMovement = new Date();
    }
  });

  useEventListener('keyup', (event) => {
    let index = characterRef.current.keysDown.findIndex(item => {
      return item === event.keyCode;
    });
    console.log(index, characterRef.current.keysDown);
    if(index > -1) {
      characterRef.current.keysDown.splice(index, 1);
    }
    doDispatch(ACTIONS.APP_ACTIONS.KEYUP);
  });

  function onSimpleInteract() {
    let targetPosition: IPoint = returnPositionInDirection(characterPosition, characterDirection, 1);
    let interactedObstacle = Object.values(obstacles).find((it) => {
      return it.position.x === targetPosition.x && it.position.y === targetPosition.y && it.onInteract;
    });
    if(interactedObstacle?.onInteract) {
      interactedObstacle.onInteract();
    }
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

  function doDispatch(type: string) {
    let currentState = store.getState();
    let action = {
      type,
      payload: {
        keycode: characterRef.current.keysDown[characterRef.current.keysDown.length - 1],
        state: currentState
      }
    };
    dispatch(action);
  }

  return (
    <React.Fragment/>
  );
}
