import { IObstacleCreatorOptions, IObstacleGroup, IPoint } from 'Types/obstacleCreator';
import { Obstacle } from '../obstacle/obstacle';
import { ReactElement } from 'react';

export function ObstacleCreator(options: IObstacleCreatorOptions) {
  function createObstacles() {
    let reducer = (accumulator, currentValue) => {
      let elements = processObstacleGroup(currentValue);
      return accumulator.concat(elements);
    };
    let obstacleElements = options.groups.reduce(reducer, []);
    return obstacleElements;
  }

  function processObstacleGroup(obstacleGroup: IObstacleGroup): ReactElement[] {
    if(obstacleGroup.type === 'point') {
      let reactElement = React.createElement(Obstacle, {
        initialPosition: obstacleGroup.points[0],
        key: Math.random(),
        id: Math.random(),
        isBlocking: obstacleGroup.isBlocking,
        image: obstacleGroup.image,
        onInteract: obstacleGroup.onInteract
      });
      return [reactElement];
    }
    if(obstacleGroup.type === 'line') {
      let a = obstacleGroup.points[0];
      let b = obstacleGroup.points[1];
      let points: Set<IPoint> = createLineBetweenTwoPoints(a.x, a.y, b.x, b.y);
      let obstacles = [...points].map(point => {
        let reactElement = React.createElement(Obstacle,
          {
            initialPosition: point,
            key: Math.random(),
            id: Math.random(),
            isBlocking: obstacleGroup.isBlocking,
            image: obstacleGroup.image,
            onInteract: obstacleGroup.onInteract
          });
        return reactElement;
      });
      return obstacles;
    } else if (obstacleGroup.type === 'plane') {
      let totalPoints = new Set<IPoint>([]);
      for(let i = 0; i < obstacleGroup.points.length; i++) {
        let point1 = obstacleGroup.points[i];
        let point2 = (i === obstacleGroup.points.length - 1) ? obstacleGroup.points[0] : obstacleGroup.points[i + 1];
        let points: Set<IPoint> = createLineBetweenTwoPoints(point1.x, point1.y, point2.x, point2.y);
        totalPoints = new Set<IPoint>([...points, ...totalPoints]);
      }
      totalPoints = fillAreaInsidePoints(totalPoints);
      let obstacles = [...totalPoints].map(point => {
        let reactElement = React.createElement(Obstacle,
          {initialPosition: point,
            key: Math.random(),
            id: Math.random(),
            isBlocking: obstacleGroup.isBlocking,
            image: obstacleGroup.image,
            onInteract: obstacleGroup.onInteract
          });
        return reactElement;
      });
      return obstacles;
    }
  }

  function createLineBetweenTwoPoints(x1: number, y1: number, x2: number, y2: number): Set<IPoint> {
    let points: IPoint[] = [];
    let xDistance = Math.abs(x2 - x1);
    let yDistance = Math.abs(y2 - y1);
    let xTraveled = 0;
    let yTraveled = 0;
    let xDirection = x1 < x2 ? 'increment' : 'decrement';
    let yDirection = y1 < y2 ? 'increment' : 'decrement';
    let rounds = 0;
    while((xTraveled < xDistance || yTraveled < yDistance) && rounds < 1000) {
      let x = xDirection === 'increment' ? x1 + xTraveled : x1 - xTraveled;
      let y = yDirection === 'increment' ? y1 + yTraveled : y1 - yTraveled;
      rounds++;
      points.push({x, y});
      let xyRatio = xDistance / yDistance;
      let isXAboveRatio = xyRatio >= 1 ? true : (yTraveled * xyRatio >= xTraveled);
      let isYAboveRatio = xyRatio >= 1 ? ((yTraveled * xyRatio) <= xTraveled) : true;
      if(xTraveled < xDistance && isXAboveRatio) {
        xTraveled++;
      }
      if(yTraveled < yDistance && isYAboveRatio) {
        yTraveled++;
      }
    }
    return new Set<IPoint>(points);
  }

  function fillAreaInsidePoints(points: Set<IPoint>): Set<IPoint> {
    let filledPoints: Set<IPoint> = new Set<IPoint>([...points]);

    for(let singlePoint of points) {
      createTestPoint(singlePoint, filledPoints);
    }

    return filledPoints;
  }

  function createTestPoint(singlePoint: IPoint, allPoints: Set<IPoint>) {
    let testPoint: IPoint = {
      x: singlePoint.x + 1,
      y: singlePoint.y
    };

    let isAcceptablePoint = [...allPoints].some(borderPoint => {
      let isIdentical = borderPoint.x === testPoint.x && borderPoint.y === testPoint.y;
      let hasPointAbove = borderPoint.x === testPoint.x && borderPoint.y > testPoint.y;
      let hasPointBelow = false;
      if(hasPointAbove && !isIdentical) {
        hasPointBelow = [...allPoints].some(secondBorderPoint => {
          return secondBorderPoint.x === testPoint.x && secondBorderPoint.y < testPoint.y;
        });
      }

      return !isIdentical  && hasPointAbove && hasPointBelow;
    });
    if(isAcceptablePoint) {
      allPoints.add(testPoint);
      createTestPoint(testPoint, allPoints);
    }
  }

  return createObstacles();
}
