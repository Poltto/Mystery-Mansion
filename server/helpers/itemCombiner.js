let sortBy = require('lodash/sortBy');
let isEqual = require('lodash/isEqual');
let ITEM_COMBINATIONS = require('./statics.item-combinations.js');

function ItemCombiner(itemIds) {

  let sortedIds = sortBy(itemIds, id => id);
  let foundCombination = ITEM_COMBINATIONS.find(singleCombination => {
    let sortedIdsOfCombination = sortBy(singleCombination.itemIds, id => id);
    return isEqual(sortedIds, sortedIdsOfCombination);
  });
  return foundCombination?.result?.id;
}

module.exports = ItemCombiner;
