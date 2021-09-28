import { Obstacle } from '../obstacle/obstacle';
const GAME_OBJECT_INTERACTIONS = require('Helpers/interactions.game-object.ts');


export function ObstacleCreator(obstaclesFromServer) {
  function createObstacles() {
    let obstacleElements = obstaclesFromServer.map(obstacle => createElementForObstacle(obstacle), []).reduce((obj, item) => {
      return {...obj, [item.props.id]: item};
    }, {});
    return obstacleElements;
  }

  function createElementForObstacle(point) {
    return React.createElement(Obstacle,
      {
        positionX: point.positionX,
        positionY: point.positionY,
        key: point.id,
        id: point.id,
        isBlocking: point.isBlocking,
        image: point.image,
        onInteract: GAME_OBJECT_INTERACTIONS[point?.onInteract] ?? GAME_OBJECT_INTERACTIONS['void']
      });
  }

  return createObstacles();
}
