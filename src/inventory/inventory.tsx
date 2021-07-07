import { useDispatch, useSelector } from 'react-redux';
import { ACTIONS } from '../redux/actions';
import { Obstacle } from '../obstacle/obstacle';
import ItemSlot from '../itemSlot/itemSlot';
import { ItemCombiner } from '../item-combiner/itemCombiner';
import { ICombination } from 'Types/combination';
export function Inventory() {
  let itemCombiner = new ItemCombiner();
  const inventory = useSelector(state => {
    return state.ItemReducer.inventory;
  });
  const dispatch = useDispatch();

  let itemSlots = inventory.itemSlots.map(slot => {
    return <ItemSlot key={slot.id} id={slot.id} item={slot.item} selected={slot.selected} focused={slot.focused}/>;
  });

  function toggleSelectedOnItemSlot(itemSlot) {
    let action = ACTIONS.ITEM_ACTIONS.TOGGLE_SELECTED_ON_ITEM_SLOT(itemSlot);
    dispatch(action);
    return;
  }

  function combine() {
    let selectedItemSlots = inventory.itemSlots.filter(itemSlot => {
      return itemSlot.selected && itemSlot.item?.id;
    });

    let foundCombination: ICombination = itemCombiner.getCombination(selectedItemSlots);
    let action = ACTIONS.ITEM_ACTIONS.COMBINE(foundCombination);
    dispatch(action);
    return;
  }



  return (
    <div className={inventory?.isOpen ? 'inventory-wrapper is-open' : 'inventory-wrapper'}>
      <div className={'inventory-container'}>
        <div className={'inventory-slot-wrapper'}>
          {itemSlots}
        </div>

        <div className={'combiner-wrapper'}>
          <div className={'combiner-container'}>
            <div className={'combiner action'}>
              <button className={'button'} onClick={combine}>
                Combine
              </button>
            </div>
          </div>
        </div>
        <div className={'fill'}></div>

      </div>
    </div>
  );
}
