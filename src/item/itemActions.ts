import { IItem } from 'Types/item';
import { IExistingItems } from 'Types/existingItems';
import { ICombination } from 'Types/combination';
import { IInventoryItem } from 'Types/inventoryItem';

export const ITEM_ACTIONS = {

  ENUMS: {
    SET_POSITION: 'SET_POSITION',
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    ADD_INVENTORY_ITEM: 'ADD_INVENTORY_ITEM',
    REMOVE_INVENTORY_ITEM: 'REMOVE_INVENTORY_ITEM',
    OPEN: 'OPEN',
    CLOSE: 'CLOSE',
    TOGGLE: 'TOGGLE',
    PICK_UP_ITEM: 'PICK_UP_ITEM',
    FOCUS_ITEM_SLOT: 'FOCUS_ITEM_SLOT',
    TOGGLE_SELECTED_ON_ITEM_SLOT: 'TOGGLE_SELECTED_ON_ITEM_SLOT',
    COMBINE: 'COMBINE',
    CHANGE_ITEM_SLOT: 'CHANGE_ITEM_SLOT'
  },
  CHANGE_ITEM_SLOT: (targetId: number, inventoryItem: IInventoryItem) => {
    return {
      type: ITEM_ACTIONS.ENUMS.CHANGE_ITEM_SLOT,
      payload: {
        targetId,
        inventoryItem
      }
    };
  },

  COMBINE: (combination: ICombination) => {
    return {
      type: ITEM_ACTIONS.ENUMS.COMBINE,
      payload: {
        combination
      }
    };
  },

  TOGGLE_SELECTED_ON_ITEM_SLOT: (itemSlot) => {
    return {
      type: ITEM_ACTIONS.ENUMS.TOGGLE_SELECTED_ON_ITEM_SLOT,
      payload: {
        itemSlot
      }
    };
  },

  FOCUS_ITEM_SLOT: (itemSlot) => {
    return {
      type: ITEM_ACTIONS.ENUMS.FOCUS_ITEM_SLOT,
      payload: {
        itemSlot
      }
    };
  },

  SET_POSITION: (itemPosition) => {
    return {
      type: ITEM_ACTIONS.ENUMS.SET_POSITION,
      payload: itemPosition
    };
  },

  ADD_ITEM: (item) => {
    return {
      type: ITEM_ACTIONS.ENUMS.ADD_ITEM,
      payload: item
    };
  },

  REMOVE_ITEM: (item) => {
    return {
      type: ITEM_ACTIONS.ENUMS.REMOVE_ITEM,
      payload: item
    };
  },

  ADD_INVENTORY_ITEM: (inventoryItem) => {
    return {
      type: ITEM_ACTIONS.ENUMS.ADD_INVENTORY_ITEM,
      payload: inventoryItem
    };
  },

  REMOVE_INVENTORY_ITEM: (inventoryItem) => {
    return {
      type: ITEM_ACTIONS.ENUMS.REMOVE_INVENTORY_ITEM,
      payload: inventoryItem
    };
  },

  PICK_UP_ITEM: (interactedItems: IItem[]) => {
    let itemsNotInInventory = interactedItems.filter(item => !item.isInInventory).map(item => item.id);
    return {
      type: ITEM_ACTIONS.ENUMS.PICK_UP_ITEM,
      payload: {
        interactedItemIds: itemsNotInInventory
      }
    };
  },

  TOGGLE: () => {
    return {
      type: ITEM_ACTIONS.ENUMS.TOGGLE
    };
  },

  OPEN: () => {
    return {
      type: ITEM_ACTIONS.ENUMS.OPEN
    };
  },

  CLOSE: () => {
    return {
      type: ITEM_ACTIONS.ENUMS.CLOSE
    };
  }

};
