import { useDispatch, useSelector } from 'react-redux';
import { ACTIONS } from '../redux/actions';
import ItemSlot from '../itemSlot/itemSlot';
import {RootState} from "../redux/reducers";
import { useMutation } from '@apollo/client';
const ITEM_MUTATIONS = require('../graphql/mutations/graphql.mutations.item');

export function Inventory() {
  const inventory = useSelector((state: RootState) => {
    return state.ItemReducer.inventory;
  });
  const [combineMutation, {data, loading, error}] = useMutation(ITEM_MUTATIONS.COMBINE);

  const dispatch = useDispatch();

  let itemSlotElements = inventory.itemSlots?.map(slot => {
    return <ItemSlot key={slot.id} id={slot.id} inventoryItem={slot.inventoryItem} selected={slot.selected} focused={slot.focused}/>;
  });

  function combine() {
    let selectedItemSlotIds = inventory.itemSlots.filter(itemSlot => {
      return itemSlot.selected;
    }).map(itemSlot => itemSlot.id);

    combineMutation({
      variables: {
        itemSlotIds: selectedItemSlotIds
      }
    }).then(result => {
      let resultData = result.data.combine;
      let combinePayload = {
        oldItemSlots: resultData.oldItemSlots,
        newItemSlot: resultData.newItemSlot
      }
      let updateItemsPayload = [...resultData.oldItems, resultData.newItem];
      let combineAction = ACTIONS.ITEM_ACTIONS.COMBINE(combinePayload);
      let updateItemsAction = ACTIONS.ITEM_ACTIONS.UPDATE_ITEMS(updateItemsPayload);
      dispatch(combineAction);
      dispatch(updateItemsAction);
    }, error => {
      console.log(error);
    })
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
