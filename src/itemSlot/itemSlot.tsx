import { ACTIONS } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { IItemSlot } from 'Types/itemSlot';

const ItemSlot = (props) => {
  let dispatch = useDispatch();
  function getClassName() {
    let className = 'inventory-slot ' + props?.id ?? '';
    if(props.focused) {
      className += ' focused';
    }
    if(props.selected) {
      className += ' selected';
    }
    return className;
  }

  function getImage() {
    return props?.item?.image;
  }

  function focusItemSlot() {
    let action;
    if(props.focused) {
      action = ACTIONS.ITEM_ACTIONS.TOGGLE_SELECTED_ON_ITEM_SLOT(props);
    } else {
      action = ACTIONS.ITEM_ACTIONS.FOCUS_ITEM_SLOT(props);
    }
    dispatch(action);
    return;
  }

  function toggleSelected() {
    let action = ACTIONS.ITEM_ACTIONS.TOGGLE_SELECTED_ON_ITEM_SLOT(props);
    dispatch(action);
    return;
  }

  return(
    <div onClick={focusItemSlot} key={props?.id} className={getClassName()}><img src={getImage()}/></div>
  );
};

export default React.memo(ItemSlot, (prevProps, nextProps) => {
  return prevProps.selected === nextProps.selected && prevProps.focused === nextProps.focused && prevProps.item?.id === nextProps.item?.id;
});
