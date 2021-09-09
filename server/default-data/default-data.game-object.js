

async function initGameObjects(sequelize) {
  const GameObject = require('../models/models.game-object.js');
  const GAME_OBJECTS = require('../../src/helpers/game-objects.ts');
  const DefaultDataObstacleCreator = require('./default-data.obstacle-creator.ts');

  let allPoints = DefaultDataObstacleCreator({groups: GAME_OBJECTS});




  allPoints.forEach(point => {

    GameObject.findOrCreate({
      where: {
        positionX: point.positionX,
        positionY: point.positionY
      },
      defaults: {
        positionX: point.positionX,
        positionY: point.positionY,
        image: point.image,
        onInteract: point.onInteract,
        isBlocking: point.isBlocking,
        id: point.positionX?.toString() + point.positionY?.toString()
      }
    });
  });
}

module.exports = initGameObjects;
