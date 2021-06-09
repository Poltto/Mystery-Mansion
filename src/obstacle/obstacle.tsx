import { useDispatch, useSelector } from 'react-redux';
import { useEventListener } from '../use-event-listener';
import { useEffect } from 'react';
import { ACTIONS } from '../redux/actions';

export function Obstacle(props) {
  const obstacle = useSelector(state => {
    return state.ObstacleReducer.obstacles[props.id];
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if(isDirty()) {
      let action = ACTIONS.OBSTACLE_ACTIONS.ADD_OBSTACLE({
        id: props.id,
        position: props.initialPosition,
        isBlocking: props.isBlocking,
        image: props.image,
        onInteract: props.onInteract
      });
      dispatch(action);
    }

  });

  function isDirty() {
    if(!obstacle) {
      return true;
    }
    let comparableFields = ['position.x', 'position.y'];
    let hasDirtyField = comparableFields.some(field => {
      return obstacle[field] !== props[field];
    });
    return hasDirtyField;
  }

  function getStyle() {
    if(!obstacle) {
      return {};
    } else {
      let styles = {
        left: obstacle?.position?.x * 60,
        top: obstacle?.position?.y * 60
      };
      return styles;
    }
  }

  function getText() {
    return obstacle?.isBlocking ? 'X' : 'O';
  }

  function getImage() {
    return obstacle?.image;
  }

  return (
    <div style={getStyle()} className='obstacle'>
      <img src={getImage()}/>
    </div>
  );
}
