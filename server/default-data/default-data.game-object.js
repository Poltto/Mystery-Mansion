const OBSTACLE_STATICS = require('../../src/helpers/statics.obstacles.ts');
const INTERACTIONS = require('../../src/helpers/interactions.game-object.ts');
async function initGameObjects(sequelize) {
  const GAME_OBJECTS = [
      // {
      //   type: 'line',
      //   points:[{x: 4, y: 15}, {x: 8, y: 3}]
      // },
      // {
      //   type: 'line',
      //   points: [{x: 0, y: 1}, {x: 9, y: 2}]
      // },
      // {
      //   type: OBSTACLE_TYPES.Point,
      //   isBlocking: true,
      //   image: '/images/wood_floor_1.png',
      //   points: [{x: 15, y: 15}],
      //   onInteract: () => {
      //     let action = {
      //       type: ACTIONS.DIALOG_ACTIONS.ENUMS.OPEN_DIALOG,
      //       payload: {
      //         header: '<div>Test header new</div>',
      //         content: '<div>Test content new</div>',
      //         footer: undefined,
      //         onSubmit: () => {
      //           return new Promise((resolve, reject) => {
      //             console.log("You closed the dialog!");
      //             resolve('OK');
      //           });
      //         }
      //       }
      //     };
      //     dispatch(action);
      //   }
      // },
      // {
      //   type: OBSTACLE_TYPES.Plane,
      //   isBlocking: true,
      //   image: '/images/wood_floor_1.png',
      //   points: [{x: 0, y:5}, {x: 5, y: 5}, {x: 5, y: 10}, {x: 3, y: 12}, {x: 2, y: 12}, {x: 0, y: 10}]
      // },
      // {
      //   type: OBSTACLE_TYPES.Plane,
      //   isBlocking: false,
      //   image: '/images/wood_floor_1.png',
      //   points: [{x: 10, y: 0}, {x: 15, y: 0}, {x: 15, y: 1}, {x: 10, y: 1}]
      // },
      {
        type: OBSTACLE_STATICS.TYPES.Polygon,
        isBlocking: true,
        image: OBSTACLE_STATICS.TEXTURES.WALL_1,
        points: [{positionX: 10, positionY: 2}, {positionX: 20, positionY: 2}, {positionX: 20, positionY: 8}, {positionX: 10, positionY: 8}],
        specialPoints: [{positionX: 15, positionY: 8, image: OBSTACLE_STATICS.TEXTURES.WOOD_FLOOR_1, isBlocking: false, onInteract: 'void'}],
        onInteract: INTERACTIONS['VOID']
      }
    ]

  const GameObject = require('../models/models.game-object.js');
  const DefaultDataObstacleCreator = require('./default-data.obstacle-creator.js');

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
