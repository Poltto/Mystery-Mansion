async function initInventory() {

  const Inventory = require('../models/models.inventory.js');

  Inventory.create({
    inventoryItems: []
  })
}

module.exports = initInventory;
