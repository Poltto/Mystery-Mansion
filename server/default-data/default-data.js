
function initModels(sequelize) {
  const { DataTypes } = require('sequelize');
  const GameObject = require('../models/models.game-object.js');
  const Item = require('../models/models.item.js');
  const InventoryItem = require('../models/models.inventory-item.js');
  const Inventory = require('../models/models.inventory.js');
  const ItemSlot = require('../models/models.item-slot.js');

  Item.init({
    positionX: DataTypes.INTEGER,
    positionY: DataTypes.INTEGER,
    onInteract: DataTypes.STRING,
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    isInInventory: DataTypes.BOOLEAN,
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    sequelize
  });

  InventoryItem.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    sequelize
  });

  Inventory.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    sequelize
  })

  ItemSlot.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    selected: {
      type: DataTypes.BOOLEAN
    },
    focused: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize
  })

  InventoryItem.belongsTo(Inventory, {foreignKey: 'inventoryId'});
  InventoryItem.belongsTo(Item, {foreignKey: 'itemId'});
  ItemSlot.belongsTo(InventoryItem, {foreignKey: 'inventoryItemId'});
  ItemSlot.belongsTo(Inventory, {foreignKey: 'inventoryId'})

  GameObject.init({
    positionX: DataTypes.INTEGER,
    positionY: DataTypes.INTEGER,
    onInteract: DataTypes.STRING,
    isBlocking: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false
    }
  }, {
    sequelize
  });
}

async function initData() {
  let initGameObjects = require('./default-data.game-object.js');
  let initItems = require('./default-data.item.js');
  let initInventory = require('./default-data.inventory.js');
  let initItemSlots = require('./default-data.item-slot.js');
  initGameObjects();
  initItems();
  await initInventory();
  initItemSlots();
}


module.exports = {
  initModels,
  initData
};
