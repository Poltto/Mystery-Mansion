import { useDispatch, useSelector } from 'react-redux';
import { useEventListener } from '../use-event-listener';
import { useEffect } from 'react';
import { ACTIONS } from '../redux/actions';

export function Obstacle(props) {
  const obstacle = useSelector(state => {
    return state.ObstacleReducer.obstacles[props.id];
  });
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if(isDirty()) {
  //     let reactElement = React.createElement(Obstacle,
  //       {
  //         id: props.id,
  //         key: props.key,
  //         positionX: props.positionX,
  //         positionY: props.positionY,
  //         isBlocking: props.isBlocking,
  //         image: props.image,
  //         onInteract: props.onInteract
  //       });
  //     let action = ACTIONS.OBSTACLE_ACTIONS.ADD_OBSTACLES([reactElement]);
  //     dispatch(action);
  //   }
  // });

  function isDirty() {
    if(!obstacle) {
      return true;
    }
    let comparableFields = ['positionX', 'positionY'];
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
        left: (obstacle?.props?.positionX ?? 0) * 60,
        top: (obstacle?.props?.positionY ?? 0) * 60
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
