import { IItem } from 'Types/item';
import { IExistingItems } from 'Types/existingItems';

export const ITEM_ACTIONS = {

  ENUMS: {
    SET_POSITION: 'SET_POSITION',
    ADD_ITEM: 'ADD_ITEM',
    OPEN: 'OPEN',
    CLOSE: 'CLOSE',
    TOGGLE: 'TOGGLE',
    PICK_UP_ITEM: 'PICK_UP_ITEM',
    FOCUS_ITEM_SLOT: 'FOCUS_ITEM_SLOT',
    TOGGLE_SELECTED_ON_ITEM_SLOT: 'TOGGLE_SELECTED_ON_ITEM_SLOT'
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

  PICK_UP_ITEM: (interactedItems: IItem[], existingItems: IExistingItems) => {
    return {
      type: ITEM_ACTIONS.ENUMS.PICK_UP_ITEM,
      payload: {
        interactedItems,
        existingItems
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
