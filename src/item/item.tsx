import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ACTIONS } from '../redux/actions';

export function Item(props) {
  const item = useSelector(state => {
    return state.ItemReducer.items[props.id];
  }, comparisonFunction);

  function comparisonFunction(newItem, oldItem) {
    return newItem.isInInventory === oldItem.isInInventory && newItem.position.x === oldItem.position.x && newItem.position.y === oldItem.position.y;
  }
  // let item = items[props.id];
  const dispatch = useDispatch();

  useEffect(() => {
    if(isDirty()) {

      let action = ACTIONS.ITEM_ACTIONS.ADD_ITEM({
        id: props.id,
        position: props.initialPosition,
        name: props.name,
        image: props.image,
        onInteract: props.onInteract,
        isInInventory: props.isInInventory
      });
      dispatch(action);
    }

  }, [item]);

  function isDirty() {
    if(!item) {
      return true;
    }
    let comparableFields = ['position.x', 'position.y'];
    let hasDirtyField = comparableFields.some(field => {
      return item[field] !== props[field];
    });
    return hasDirtyField;
  }


  function getStyle() {
    if(!item ) {
      return {};
    } else {
      let styles;
      if(item.isInInventory) {
        styles = {
          left: 99999,
          top: 99999
        };
      } else {
        styles = {
          left: item?.position?.x * 60,
          top: item?.position?.y * 60
        };
      }

      return styles;
    }
  }

  function getImage() {
    return item?.image;
  }

  return (
    <div style={getStyle()} className='item'>
      <img src={getImage()}/>
    </div>
  );
}
