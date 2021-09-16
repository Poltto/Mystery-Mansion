
function initModels(sequelize) {
  const { DataTypes } = require('sequelize');
  const GameObject = require('../models/models.game-object.js');
  const Item = require('../models/models.item.js');
  const InventoryItem = require('../models/models.inventory-item.js');
  const Inventory = require('../models/models.inventory.js');

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

  InventoryItem.belongsTo(Inventory, {foreignKey: 'inventoryId', as: 'Inventory'});
  InventoryItem.belongsTo(Item, {foreignKey: 'itemId', as: 'Item'});


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

function initData() {
  let initGameObjects = require('./default-data.game-object.js');
  let initItems = require('./default-data.item.js');
  let initInventory = require('./default-data.inventory.js');
  initGameObjects();
  initItems();
  initInventory();
}


module.exports = {
  initModels,
  initData
};
