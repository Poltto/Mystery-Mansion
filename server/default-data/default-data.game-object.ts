

async function initGameObjects(sequelize) {
  const GameObject = require('../models/game-object.ts');
  const { DataTypes } = require('sequelize');

  GameObject.init({
    positionX: DataTypes.INTEGER,
    positionY: DataTypes.INTEGER,
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    sequelize:sequelize
  });

  await GameObject.findOrCreate({
    where: {
      id: 1
    },
    defaults: {
      positionX: 1,
      positionY: 1,
      id: 1
    }
  });
  await GameObject.findOrCreate({
    where: {
      id: 2
    },
    defaults: {
      positionX: 2,
      positionY: 2,
      id: 2
    }
  });
}

module.exports = initGameObjects;
