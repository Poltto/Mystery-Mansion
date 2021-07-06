import { ACTIONS } from '../redux/actions';
import { IPoint } from 'Types/point';
import { IExistingItems } from 'Types/existingItems';
import { IItemSlot } from 'Types/itemSlot';
import { IItemState } from 'Types/itemState';
import { IItem } from 'Types/item';
let cloneDeep = require('lodash/cloneDeep');
let itemSlots: IItemSlot[] = [];

for(let i = 0; i < 36; i++) {
  itemSlots.push({id: i, item: null, selected: false, focused: false});
}


export function ItemReducer(state: IItemState = {items: {}, inventory: {isOpen: false, itemSlots: itemSlots}}, action) {
  if (action.type === ACTIONS.ITEM_ACTIONS.ENUMS.OPEN) {
    return {
      ...state,
      inventory: {
        ...state.inventory,
        isOpen: true
      }
    };
  } else if (action.type === ACTIONS.ITEM_ACTIONS.ENUMS.CLOSE) {

    return {
      ...state,
      inventory: {
        ...state.inventory,
        isOpen: false
      }
    };
  } else if (action.type === ACTIONS.ITEM_ACTIONS.ENUMS.TOGGLE) {
    return {
      ...state,
      inventory: {
        ...state.inventory,
        isOpen: !state.inventory.isOpen
      }
    };
  } else if (action.type === ACTIONS.ITEM_ACTIONS.ENUMS.SET_POSITION) {
    let items = state.items;
    items[action.payload.id].position = action.payload.position;
    return {
      ...state,
      items
    };
  } else if (action.type === ACTIONS.ITEM_ACTIONS.ENUMS.ADD_ITEM) {
    let existingItems = state.items as IExistingItems;
    existingItems[action.payload.id] = action.payload;
    return {
      ...state,
      items: existingItems
    };
  } else if (action.type === ACTIONS.ITEM_ACTIONS.ENUMS.PICK_UP_ITEM) {
    let firstAvailableSlotIndex = state.inventory.itemSlots.findIndex(slot => !slot.item);
    let availableItemSlots = state.inventory.itemSlots.filter(slot => !slot.item);
    let newSlots = cloneDeep(state.inventory.itemSlots);
    let interactedItemIds = action.payload.interactedItemIds;
    let existingItems: IExistingItems = cloneDeep(state.items);
    if (firstAvailableSlotIndex > -1 && availableItemSlots.length >= interactedItemIds.length) {
      let newItemIndex = 0;
      for (let j = firstAvailableSlotIndex; j < (firstAvailableSlotIndex + interactedItemIds.length); j++) {
        let item = Object.values(existingItems).find(existingItem => existingItem.id === interactedItemIds[newItemIndex]);
        newSlots[j].item = item;
        item.isInInventory = true;
        newItemIndex++;
      }
    }

    return {
      ...state,
      items: existingItems,
      inventory: {
        ...state.inventory,
        itemSlots: newSlots
      }
    };
  } else if(action.type === ACTIONS.ITEM_ACTIONS.ENUMS.FOCUS_ITEM_SLOT) {
    let newInventory = cloneDeep(state.inventory);
    let indexOfOldFocus = newInventory.itemSlots.findIndex(slot => slot.focused);
    let indexOfNewFocus = newInventory.itemSlots.findIndex(slot => slot.id === action.payload.itemSlot.id);
    if(indexOfOldFocus > -1) {
      newInventory.itemSlots[indexOfOldFocus].focused = false;
    }
    if(indexOfNewFocus > -1) {
      newInventory.itemSlots[indexOfNewFocus].focused = true;
    }

    return {
      ...state,
      inventory: newInventory
    };
  } else if(action.type === ACTIONS.ITEM_ACTIONS.ENUMS.TOGGLE_SELECTED_ON_ITEM_SLOT) {
    let newInventory = cloneDeep(state.inventory);
    let index = newInventory.itemSlots.findIndex(slot => slot.id === action.payload.itemSlot.id);
    if(index > -1) {
      newInventory.itemSlots[index].selected = !newInventory.itemSlots[index].selected;
    }
    return {
      ...state,
      inventory: newInventory
    };
  } else {
    return state;
  }
}
