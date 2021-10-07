import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ACTIONS } from '../redux/actions';
import {RootState} from "../redux/reducers";
import { STATICS } from '../enums/statics';

export function Item(props) {
  const item = useSelector((state: RootState) => {
    return state.ItemReducer.items[props.id];
  }, comparisonFunction);

  const zoomLevel = useSelector((state: RootState) => {
    return state.AppReducer.zoomLevel;
  });

  function comparisonFunction(newItem, oldItem) {
    return newItem.props.isInInventory === oldItem.props.isInInventory && newItem.props.positionX === oldItem.props.positionX && newItem.props.positionY === oldItem.props.positionY;
  }

  function getStyle() {
    if(!item ) {
      return {};
    } else {
      let styles;
      if(item.isInInventory) {
        styles = {
          display: 'none',
          positionX: 9999,
          positionY: 9999,
          left: 99999,
          top: 99999
        };
      } else {
        styles = {
          left: item?.props.positionX * STATICS.SQUARE * zoomLevel,
          top: item?.props.positionY * STATICS.SQUARE * zoomLevel
        };
      }

      return styles;
    }
  }

  function getImage() {
    return item?.props.image;
  }

  function getContent() {
    let content = <div style={getStyle()} className='item'>
      <img src={getImage()}/>
    </div>;

    return item.props.isInInventory ? <div/> : content;
  }

  return (getContent());
}
