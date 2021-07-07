import { IItem } from 'Types/item';
import { IItemSlot } from 'Types/itemSlot';
import { ICombination } from 'Types/combination';
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

  public getCombination(itemSlots: IItemSlot[]): ICombination {
    let itemIds = itemSlots.map(itemSlot => itemSlot.item?.id);
    let sortedIds = sortBy(itemIds, id => id);
    let foundCombination: ICombination = this.ITEM_COMBINATIONS.find(singleCombination => {
      let sortedIdsOfCombination = sortBy(singleCombination.itemIds, id => id);
      return isEqual(sortedIds, sortedIdsOfCombination);
    });
    return foundCombination;
  }
}
