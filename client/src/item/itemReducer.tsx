import { ACTIONS } from '../redux/actions';
import { IPoint } from 'Types/point';
import { IExistingItems } from 'Types/existingItems';
import { IItemSlot } from 'Types/itemSlot';
import { IItemState } from 'Types/itemState';
import { IItem } from 'Types/item';
import { ICombination } from 'Types/combination';
import { IInventoryItem } from 'Types/inventoryItem';
let cloneDeep = require('lodash/cloneDeep');
let initialItemSlots: IItemSlot[] = [];


export function ItemReducer(state: IItemState = {items: {}, inventoryItems: [], inventory: {isOpen: false, itemSlots: []}}, action) {
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
  } else if (action.type === ACTIONS.ITEM_ACTIONS.ENUMS.UPDATE_ITEMS) {
    let existingItems = {...state.items};
    for(let item of action.payload) {
      if(item.props) {
        existingItems[item.id] = item;
      } else {
        for(let key in item) {
          existingItems[item.id].props[key] = item[key];
        }
      }
    }

    return {
      ...state,
      items: existingItems
    }

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
    items[action.payload.id].props.positionX = action.payload.positionX;
    items[action.payload.id].props.positionY = action.payload.positionY;
    return {
      ...state,
      items
    };
  } else if (action.type === ACTIONS.ITEM_ACTIONS.ENUMS.ADD_ITEMS) {
    let newItems = {
      ...cloneDeep(state.items),
      ...action.payload
    };
    return {
      ...state,
      items: newItems
    };
  } else if (action.type === ACTIONS.ITEM_ACTIONS.ENUMS.REMOVE_ITEM) {
    let existingItems = cloneDeep(state.items) as IExistingItems;
    delete existingItems[action.payload.id];
    return {
      ...state,
      items: existingItems
    };
  } else if (action.type === ACTIONS.ITEM_ACTIONS.ENUMS.ADD_INVENTORY_ITEM) {
    console.log(action.payload);
    let existingInventoryItems = cloneDeep(state.inventoryItems) as IInventoryItem[];
    let existingItems = cloneDeep(state.items);
    existingItems[action.payload.item.id].isInInventory = true;
    existingInventoryItems[action.payload.id] = action.payload;
    return {
      ...state,
      inventoryItems: existingInventoryItems,
      items: existingItems
    };
  } else if (action.type === ACTIONS.ITEM_ACTIONS.ENUMS.REMOVE_INVENTORY_ITEM) {
    let existingInventoryItems = cloneDeep(state.inventoryItems) as IInventoryItem[];
    delete existingInventoryItems[action.payload.id];
    return {
      ...state,
      inventoryItems: existingInventoryItems
    };
  } else if (action.type === ACTIONS.ITEM_ACTIONS.ENUMS.PICK_UP_ITEM) {
    let existingItems: IExistingItems = cloneDeep(state.items);
    for(let id of action.payload.interactedItemIds) {
      existingItems[id].props.isInInventory = true;
      existingItems[id].props.positionX = 9999;
      existingItems[id].props.positionY = 9999;
    }

    return {
      ...state,
      items: existingItems
    };
  } else if(action.type === ACTIONS.ITEM_ACTIONS.ENUMS.COMBINE) {
    let oldItemSlots = action.payload.oldItemSlots;
    let newItemSlot = action.payload.itemSlot;
    let newItem = action.payload.newItem;

    let inventory = state.inventory;
    let items = state.items;

    for(let oldItem of action.payload.oldItems) {
      items[oldItem.id] = oldItem;
    }

    for(let oldItemSlot of oldItemSlots) {
      inventory.itemSlots[oldItemSlot.id] = oldItemSlot;
    }
    inventory.itemSlots[newItemSlot.id] = newItemSlot;
    items[newItem.id] = newItem;


    return {
      ...state,
      inventory,
      items
    };

  } else if(action.type === ACTIONS.ITEM_ACTIONS.ENUMS.CHANGE_ITEM_SLOT) {
    let newInventory = cloneDeep(state.inventory);
    let sourceItemSlotIndex = newInventory.itemSlots.findIndex(slot => slot.id === action.payload.inventoryItem.itemSlot.id);
    let targetItemSlotIndex = newInventory.itemSlots.findIndex(slot => slot.id === action.payload.targetId);
    if(sourceItemSlotIndex > -1 && targetItemSlotIndex > -1) {
      newInventory.itemSlots[sourceItemSlotIndex].inventoryItem = null;
      newInventory.itemSlots[targetItemSlotIndex].inventoryItem = {
        itemSlot: newInventory.itemSlots[targetItemSlotIndex],
        item: action.payload.inventoryItem.item
      };
    }
    return {
      ...state,
      inventory: newInventory
    };
  } else if (action.type === ACTIONS.ITEM_ACTIONS.ENUMS.INIT_ITEM_SLOTS) {
    let inventory = cloneDeep(state.inventory);
    inventory.itemSlots = action.payload.itemSlots;
    return {
      ...state,
      inventory
    };
  } else if(action.type === ACTIONS.ITEM_ACTIONS.ENUMS.FOCUS_ITEM_SLOT) {
    let inventory = cloneDeep(state.inventory);
    let indexOfOldFocus = inventory.itemSlots.findIndex(slot => slot.focused);
    let indexOfNewFocus = inventory.itemSlots.findIndex(slot => slot.id === action.payload.itemSlot.id);
    if(indexOfOldFocus > -1) {
      inventory.itemSlots[indexOfOldFocus].focused = false;
    }
    if(indexOfNewFocus > -1) {
      inventory.itemSlots[indexOfNewFocus].focused = true;
    }
    return {
      ...state,
      inventory
    };
  } else if(action.type === ACTIONS.ITEM_ACTIONS.ENUMS.TOGGLE_SELECTED_ITEM_SLOT) {
    let inventory = cloneDeep(state.inventory);
    let index = inventory.itemSlots.findIndex(slot => slot.id === action.payload.itemSlot.id);
    if(index > -1) {
      inventory.itemSlots[index].selected = !inventory.itemSlots[index].selected;
    }
    return {
      ...state,
      inventory
    };
  } else if (action.type === ACTIONS.ITEM_ACTIONS.ENUMS.UPDATE_ITEM_SLOT) {
    let inventory = cloneDeep(state.inventory);
    let index = inventory.itemSlots.findIndex(slot => slot.id === action.payload.itemSlot.id);
    if(index > -1) {
      inventory.itemSlots[index] = action.payload.itemSlot;
    }
    return {
      ...state,
      inventory
    }
  }
  return state;


  function putItemInFirstAvailableItemSlot(item: IItem, itemSlots: IItemSlot[]) {

  }
}
