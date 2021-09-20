import { IItem } from 'Types/item';
import { IItemSlot } from 'Types/itemSlot';
import { ICombination } from 'Types/combination';
import { IInventoryItem } from 'Types/inventoryItem';
let sortBy = require('lodash/sortBy');
let isEqual = require('lodash/isEqual');

export class ItemCombiner {

  private ITEM_COMBINATIONS = [
    {
      itemIds: [1, 2],
      result: {
        id: 3
      }
    }
  ];

  constructor() {

  }

  public getCombination(itemSlots: IItemSlot[], inventoryItems: IInventoryItem[]): ICombination {
    let itemSlotIds = itemSlots.map(itemSlot => itemSlot.id);
    let selectedInventoryItemIds = inventoryItems.filter(inventoryItem => {
      return itemSlotIds.includes(inventoryItem.itemSlotId);
    }).map(inventoryItem => inventoryItem.id);
    let sortedIds = sortBy(selectedInventoryItemIds, id => id);
    let foundCombination: ICombination = this.ITEM_COMBINATIONS.find(singleCombination => {
      let sortedIdsOfCombination = sortBy(singleCombination.itemIds, id => id);
      return isEqual(sortedIds, sortedIdsOfCombination);
    });
    return foundCombination;
  }
}
