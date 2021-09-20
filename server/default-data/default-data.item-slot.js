async function initItemSlots(sequelize) {

  const ItemSlot = require('../models/models.item-slot.js');

  for(let i = 1; i < 37; i++) {

    await ItemSlot.findOrCreate({
      where: {
        id: i
      },
      defaults: {
        inventoryId: 1,
        selected: false,
        focused: false,
        inventoryItemId: null,
        id: i
      }
    });
  }
}

module.exports = initItemSlots;
