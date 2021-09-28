import { IItem, IItemElement, IItemProps } from 'Types/item';
import { IExistingItems } from 'Types/existingItems';
import { ICombination } from 'Types/combination';
import { IInventoryItem } from 'Types/inventoryItem';

export const ITEM_ACTIONS = {

  ENUMS: {
    SET_POSITION: 'SET_POSITION',
    ADD_ITEMS: 'ADD_ITEMS',
    REMOVE_ITEM: 'REMOVE_ITEM',
    ADD_INVENTORY_ITEM: 'ADD_INVENTORY_ITEM',
    REMOVE_INVENTORY_ITEM: 'REMOVE_INVENTORY_ITEM',
    OPEN: 'OPEN',
    CLOSE: 'CLOSE',
    TOGGLE: 'TOGGLE',
    UPDATE_ITEMS: 'UPDATE_ITEMS',
    PICK_UP_ITEM: 'PICK_UP_ITEM',
    COMBINE: 'COMBINE',
    CHANGE_ITEM_SLOT: 'CHANGE_ITEM_SLOT',
    INIT_ITEM_SLOTS: 'INIT_ITEM_SLOTS',
    UPDATE_ITEM_SLOT: 'UPDATE_ITEM_SLOT',
    TOGGLE_SELECTED_ITEM_SLOT: 'TOGGLE_SELECTED',
    FOCUS_ITEM_SLOT: 'FOCUS'
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

  COMBINE: ({oldItemSlots, itemSlot, oldItems, inventoryItem, newItem}) => {
    return {
      type: ITEM_ACTIONS.ENUMS.COMBINE,
      payload: {
        oldItemSlots,
        itemSlot,
        oldItems,
        inventoryItem,
        newItem
      }
    };
  },

  SET_POSITION: (itemPosition) => {
    return {
      type: ITEM_ACTIONS.ENUMS.SET_POSITION,
      payload: itemPosition
    };
  },

  ADD_ITEMS: (items) => {
    return {
      type: ITEM_ACTIONS.ENUMS.ADD_ITEMS,
      payload: items
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

  REMOVE_INVENTORY_ITEM: (inventoryItem: IItem|IItemProps) => {
    return {
      type: ITEM_ACTIONS.ENUMS.REMOVE_INVENTORY_ITEM,
      payload: inventoryItem
    };
  },

  PICK_UP_ITEM: (interactedItemIds) => {
    return {
      type: ITEM_ACTIONS.ENUMS.PICK_UP_ITEM,
      payload: {
        interactedItemIds: interactedItemIds
      }
    };
  },

  TOGGLE: () => {
    return {
      type: ITEM_ACTIONS.ENUMS.TOGGLE
    };
  },
  UPDATE_ITEMS: (item) => {
    return {
      type: ITEM_ACTIONS.ENUMS.UPDATE_ITEMS,
      payload: item
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
  },
  INIT_ITEM_SLOTS: (itemSlots) => {
    return {
      type: ITEM_ACTIONS.ENUMS.INIT_ITEM_SLOTS,
      payload: {
        itemSlots
      }
    };
  },
  UPDATE_ITEM_SLOT: (itemSlot) => {
    return {
      type: ITEM_ACTIONS.ENUMS.UPDATE_ITEM_SLOT,
      payload: {
        itemSlot
      }
    }
  },
  TOGGLE_SELECTED_ITEM_SLOT: (itemSlot) => {
    return {
      type: ITEM_ACTIONS.ENUMS.TOGGLE_SELECTED_ITEM_SLOT,
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
  }

};
