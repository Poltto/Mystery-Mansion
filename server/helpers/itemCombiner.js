let sortBy = require('lodash/sortBy');
let isEqual = require('lodash/isEqual');
const ITEM_COMBINATIONS = [
  {
    itemIds: [1, 2],
    result: {
      id: 3
    }
  }
];


function getItemCombination(itemSlots) {
  let itemIds = sortBy(itemSlots.map(itemSlot => {
    return itemSlot?.InventoryItem?.Item?.id;
  }), id => id);
  let foundCombination = ITEM_COMBINATIONS.find(singleCombination => {
    let sortedIdsOfCombination = sortBy(singleCombination.itemIds, id => id);
    return isEqual(itemIds, sortedIdsOfCombination);
  });
  return foundCombination?.result?.id;
}

module.exports = getItemCombination;
