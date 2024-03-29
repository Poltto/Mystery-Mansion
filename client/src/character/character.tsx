import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import {RootState} from "../redux/reducers";

export function Character() {
  const characterPosition = useSelector((state: RootState) => {
    return state.CharacterReducer.characterPosition;
  });
  const characterDirection = useSelector((state: RootState) => {
    return state.CharacterReducer.characterDirection;
  });

  useEffect(() => {
    setIsMoving(true);
    setTimeout(() => {
      setIsMoving(false);
    }, 100);
  }, [characterPosition]);

  const [isMoving, setIsMoving] = useState(false);
  const characterRef = useRef({keyDown: null, lastMovement: new Date(), movementPhase: 0, resetMove: false});



  function getStyle() {
    if(!characterPosition) {
      return {};
    } else {
      let styles = {
        left: characterPosition?.positionX * 60,
        top: characterPosition?.positionY * 60,
      };
      return styles;
    }
  }

  function getSrc() {
    if(isMoving) {
      return '/images/grandma_walking_' + characterDirection + '_' + characterRef.current.movementPhase + '.png';
    } else {
      return '/images/grandma_standing_' + characterDirection + '.png';
    }
  }

  return (
    <div style={getStyle()} className={'character'} >
      <img className={'character-image'} src={getSrc()}/>
    </div>);
}
