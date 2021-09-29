import { ACTIONS } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { InventoryItem } from '../item/inventoryItem';
import { useDrop } from 'react-dnd';

const ItemSlot = (props) => {
  const [{}, drop] = useDrop(
    () => ({
      accept: 'InventoryItem',
      drop: onDrop,
      collect: (monitor) => ({
        monitor
      })
    }),
    []
  );

  function onDrop(inventoryItem) {
    let action = ACTIONS.ITEM_ACTIONS.CHANGE_ITEM_SLOT(props.id, inventoryItem);
    dispatch(action);
  }

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
    return props?.inventoryItem?.item?.image;
  }

  function focusItemSlot() {
    let action;
    if(props.focused) {
      action = ACTIONS.ITEM_ACTIONS.TOGGLE_SELECTED_ITEM_SLOT(props);
    } else {
      action = ACTIONS.ITEM_ACTIONS.FOCUS_ITEM_SLOT(props);
    }
    dispatch(action);
    return;
  }

  return(
    <div ref={drop} onClick={focusItemSlot} key={props?.id} className={getClassName()}>
      {props?.inventoryItem?.item?.id ? <InventoryItem item={props.inventoryItem.item} itemSlot={props.inventoryItem.itemSlot}/> : ''}
    </div>
  );
};

export default React.memo(ItemSlot, (prevProps, nextProps) => {
  return prevProps.selected === nextProps.selected && prevProps.focused === nextProps.focused && prevProps.inventoryItem?.item?.id === nextProps.inventoryItem?.item?.id;
});
