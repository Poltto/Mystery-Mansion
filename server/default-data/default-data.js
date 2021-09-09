
function initModels(sequelize) {
  const { DataTypes } = require('sequelize');
  const GameObject = require('../models/models.game-object.js');
  const Item = require('../models/models.item.js');
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
  initGameObjects();
  initItems();
}


module.exports = {
  initModels,
  initData
};
