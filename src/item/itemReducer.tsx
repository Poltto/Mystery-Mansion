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

for(let i = 0; i < 36; i++) {
  initialItemSlots.push({id: i, inventoryItem: null, selected: false, focused: false});
}


export function ItemReducer(state: IItemState = {items: {}, inventoryItems: [], inventory: {isOpen: false, itemSlots: initialItemSlots}}, action) {
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
    let existingItems = cloneDeep(state.items) as IExistingItems;
    existingItems[action.payload.id] = action.payload;
    return {
      ...state,
      items: existingItems
    };
  } else if (action.type === ACTIONS.ITEM_ACTIONS.ENUMS.REMOVE_ITEM) {
    let existingItems = cloneDeep(state.items) as IExistingItems;
    delete existingItems[action.payload.id];
    return {
      ...state,
      items: existingItems
    };
  } else if (action.type === ACTIONS.ITEM_ACTIONS.ENUMS.ADD_INVENTORY_ITEM) {
    let existingInventoryItems = cloneDeep(state.inventoryItems) as IInventoryItem[];
    existingInventoryItems[action.payload.id] = action.payload;
    return {
      ...state,
      inventoryItems: existingInventoryItems
    };
  } else if (action.type === ACTIONS.ITEM_ACTIONS.ENUMS.REMOVE_INVENTORY_ITEM) {
    let existingInventoryItems = cloneDeep(state.inventoryItems) as IInventoryItem[];
    delete existingInventoryItems[action.payload.id];
    return {
      ...state,
      inventoryItems: existingInventoryItems
    };
  } else if (action.type === ACTIONS.ITEM_ACTIONS.ENUMS.PICK_UP_ITEM) {
    let firstAvailableSlotIndex = state.inventory.itemSlots.findIndex(slot => !slot.inventoryItem?.item);
    let availableItemSlots = state.inventory.itemSlots.filter(slot => !slot.inventoryItem?.item);
    let newSlots = cloneDeep(state.inventory.itemSlots);
    let interactedItemIds = action.payload.interactedItemIds;
    let existingItems: IExistingItems = cloneDeep(state.items);
    let inventoryItems = cloneDeep(state.inventoryItems);
    if (firstAvailableSlotIndex > -1 && availableItemSlots.length >= interactedItemIds.length) {
      let newItemIndex = 0;
      for (let j = firstAvailableSlotIndex; j < (firstAvailableSlotIndex + interactedItemIds.length); j++) {
        let item = Object.values(existingItems).find(existingItem => existingItem.id === interactedItemIds[newItemIndex]);
        item.isInInventory = true;
        item.itemSlotId = newSlots[j].id;
        newSlots[j].inventoryItem = {
          item,
          itemSlot: newSlots[j]
        };
        newItemIndex++;
      }
    }

    return {
      ...state,
      items: existingItems,
      inventory: {
        ...state.inventory,
        itemSlots: newSlots
      },
      inventoryItems
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
  } else if(action.type === ACTIONS.ITEM_ACTIONS.ENUMS.COMBINE) {
    let combination: ICombination = action.payload.combination;
    let inventory = cloneDeep(state.inventory);
    let items = cloneDeep(state.items);
    let itemSlotsUsed = inventory.itemSlots.filter(itemSlot => {
      return combination.itemIds.includes(itemSlot.inventoryItem?.item?.id);
    });
    itemSlotsUsed.forEach(itemSlot => {
      itemSlot.inventoryItem.item.isInInventory = false;
      itemSlot.inventoryItem.item.itemSlotId = null;
      itemSlot.inventoryItem = null;
      itemSlot.selected = false;
      itemSlot.focused = false;
    });
    let firstAvailableSlotIndex = inventory.itemSlots.findIndex(slot => !slot.inventoryItem?.item);
    if(firstAvailableSlotIndex > -1) {
      inventory.itemSlots[firstAvailableSlotIndex].inventoryItem = {
        item: items[combination.result.id],
        itemSlot: inventory.itemSlots[firstAvailableSlotIndex]
      };
    }
    items[combination.result.id].isInInventory = true;

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
  } else {
    return state;
  }


  function putItemInFirstAvailableItemSlot(item: IItem, itemSlots: IItemSlot[]) {

  }
}
