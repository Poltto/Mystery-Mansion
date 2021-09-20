async function initInventory() {

  const Inventory = require('../models/models.inventory.js');

  await Inventory.create({
    inventoryItems: []
  })
}

module.exports = initInventory;
