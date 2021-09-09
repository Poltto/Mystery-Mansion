
const Item = require('../models/models.item.js');
const ITEMS = require('../../src/helpers/items.ts');

async function initItems(sequelize) {

  const {DefaultDataItemCreator} = require('./default-data.item-creator.js');

  let allItems = DefaultDataItemCreator({items: ITEMS});




  allItems.forEach(item => {

    Item.findOrCreate({
      where: {
        positionX: item.positionX,
        positionY: item.positionY
      },
      defaults: {
        positionX: item.positionX,
        positionY: item.positionY,
        image: item.image,
        name: item.name,
        onInteract: item.onInteract,
        isInInventory: item.isInInventory
      }
    });
  });
}

module.exports = initItems;
