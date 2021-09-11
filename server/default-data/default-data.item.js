let INTERACTIONS = require('../../src/helpers/statics.interactions.ts');

const Item = require('../models/models.item.js');


async function initItems(sequelize) {

  const ITEMS = [
    {
      id: 1,
      name: 'First Item',
      isInInventory: false,
      onInteract: INTERACTIONS['PICK_UP_ITEM'],
      positionX: 2,
      positionY: 2,
      image: '/images/grandma_walking_up_1.png'
    },
    {
      id: 2,
      name: 'Second Item',
      isInInventory: false,
      onInteract: INTERACTIONS['PICK_UP_ITEM'],
      positionX: 3,
      positionY: 3,
      image: '/images/grandma_walking_down_1.png'
    },
    {
      id: 3,
      name: 'Third item',
      isInInventory: false,
      onInteract: INTERACTIONS['VOID'],
      positionX: 9999,
      positionY: 9999,
      image: '/images/grandma_walking_left_1.png'
    }
  ];


  const DefaultDataItemCreator = require('./default-data.item-creator.js');

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
