import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ACTIONS } from '../redux/actions';
import {RootState} from "../redux/reducers";

export function Item(props) {
  const item = useSelector((state: RootState) => {
    return state.ItemReducer.items[props.id];
  }, comparisonFunction);

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
          left: item?.props.positionX * 60,
          top: item?.props.positionY * 60
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