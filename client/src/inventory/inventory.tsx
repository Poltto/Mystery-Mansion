import { useDispatch, useSelector } from 'react-redux';
import { ACTIONS } from '../redux/actions';
import { Obstacle } from '../obstacle/obstacle';
import ItemSlot from '../itemSlot/itemSlot';
import { ItemCombiner } from '../item-combiner/itemCombiner';
import { ICombination } from 'Types/combination';
import {RootState} from "../redux/reducers";
import { Item } from '../endpoints/endpoint.item';
export function Inventory() {
  let itemCombiner = new ItemCombiner();
  const inventory = useSelector((state: RootState) => {
    return state.ItemReducer.inventory;
  });
  const inventoryItems = useSelector((state: RootState) => {
    return state.ItemReducer.inventoryItems;
  })

  const dispatch = useDispatch();

  let itemSlotElements = inventory.itemSlots?.map(slot => {

    return <ItemSlot key={slot.id} id={slot.id} inventoryItem={slot.inventoryItem} selected={slot.selected} focused={slot.focused}/>;
  });

  function combine() {
    let selectedItemSlotIds = inventory.itemSlots.filter(itemSlot => {
      return itemSlot.selected;
    }).map(itemSlot => itemSlot.id);

    Item.combine(selectedItemSlotIds).then(result => result.json().then(resultJson => {
      console.log("ResultJSON: ", resultJson);
      let action = ACTIONS.ITEM_ACTIONS.COMBINE(resultJson);
      dispatch(action);
    }))
  }



  return (
    <div className={inventory?.isOpen ? 'inventory-wrapper is-open' : 'inventory-wrapper'}>
      <div className={'inventory-container'}>
        <div className={'inventory-slot-wrapper'}>
          {itemSlotElements}
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
