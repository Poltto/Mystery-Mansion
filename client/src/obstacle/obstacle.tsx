import { useDispatch, useSelector } from 'react-redux';
import { useEventListener } from '../use-event-listener';
import { useEffect } from 'react';
import { ACTIONS } from '../redux/actions';
import {RootState} from "../redux/reducers";

export function Obstacle(props) {
  const obstacle = useSelector((state: RootState) => {
    return state.ObstacleReducer.obstacles[props.id];
  });

  const zoomLevel = useSelector((state: RootState) => {
    return state.AppReducer.zoomLevel;
  });

  function getStyle() {
    if(!obstacle) {
      return {};
    } else {
      let styles = {
        left: (obstacle?.props?.positionX ?? 0) * 60 * zoomLevel,
        top: (obstacle?.props?.positionY ?? 0) * 60 * zoomLevel
      };
      return styles;
    }
  }

  function getText() {
    return obstacle?.props?.isBlocking ? 'X' : 'O';
  }

  function getImage() {
    return obstacle?.props?.image;
  }

  return (
    <div style={getStyle()} className='obstacle'>
      <img src={getImage()}/>
    </div>
  );
}
