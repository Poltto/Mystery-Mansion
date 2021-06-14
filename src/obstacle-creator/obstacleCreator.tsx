import { IObstacleCreatorOptions, IObstacleGroup, IPoint } from 'Types/obstacleCreator';
import { Obstacle } from '../obstacle/obstacle';
import { ReactElement } from 'react';
import { OBSTACLE_TYPES } from 'Types/obstacleTypes';

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
    if(obstacleGroup.type === OBSTACLE_TYPES.Point) {
      return createElementsFromPoints(new Set(obstacleGroup.points), obstacleGroup);
    } else if(obstacleGroup.type === OBSTACLE_TYPES.Line) {
      let a = obstacleGroup.points[0];
      let b = obstacleGroup.points[1];
      let points: Set<IPoint> = createLineBetweenTwoPoints(a, b);
      return createElementsFromPoints(points, obstacleGroup);
    } else if (obstacleGroup.type === OBSTACLE_TYPES.Plane) {
      let totalPoints = createPolygon(obstacleGroup);
      totalPoints = fillAreaInsidePoints(totalPoints);
      return createElementsFromPoints(totalPoints, obstacleGroup);
    } else if (obstacleGroup.type === OBSTACLE_TYPES.Polygon) {
      let totalPoints = createPolygon(obstacleGroup);
      return createElementsFromPoints(totalPoints, obstacleGroup);
    }
  }

  function createElementsFromPoints(totalPoints: Set<IPoint>, obstacleGroup: IObstacleGroup) {
    let totalPointsAdjustedWithSpecialPoints;
    if(obstacleGroup.specialPoints) {
      let pointArray = [...totalPoints];
      for(let specialPoint of obstacleGroup.specialPoints) {
        let indexToReplace;
        for(let i = 0; i < pointArray.length; i++) {
          if(specialPoint.x === pointArray[i].x && specialPoint.y === pointArray[i].y) {
            indexToReplace = i;
            break;
          }
        }
        pointArray[indexToReplace] = specialPoint;
      }
      totalPointsAdjustedWithSpecialPoints = new Set(pointArray);
    } else {
      totalPointsAdjustedWithSpecialPoints = totalPoints;
    }



    let obstacles = [...totalPointsAdjustedWithSpecialPoints].map(point => {
      let isBlocking = (point.isBlocking === true || point.isBlocking === false) ? point.isBlocking : obstacleGroup.isBlocking;
      let reactElement = React.createElement(Obstacle,
        {initialPosition: point,
          key: Math.random(),
          id: Math.random(),
          isBlocking,
          image: point.image ?? obstacleGroup.image,
          onInteract: obstacleGroup.onInteract
        });
      return reactElement;
    });
    return obstacles;
  }

  function createPolygon(obstacleGroup): Set<IPoint> {
    let totalPoints = new Set<IPoint>([]);
    for(let i = 0; i < obstacleGroup.points.length; i++) {
      let point1 = obstacleGroup.points[i];
      let point2 = (i === obstacleGroup.points.length - 1) ? obstacleGroup.points[0] : obstacleGroup.points[i + 1];
      let points: Set<IPoint>;
      if(point1.x === point2.x && point1.y === point2.y) {
        points = new Set<IPoint>([point1]);
      } else {
        points = createLineBetweenTwoPoints(point1, point2);
      }
      totalPoints = new Set<IPoint>([...points, ...totalPoints]);
    }
    return totalPoints;
  }

  function createLineBetweenTwoPoints(point1: IPoint, point2: IPoint): Set<IPoint> {
    let points: IPoint[] = [];
    let xDistance = Math.abs(point2.x - point1.x);
    let yDistance = Math.abs(point2.y - point1.y);
    let xTraveled = 0;
    let yTraveled = 0;
    let xDirection = point1.x < point2.x ? 'increment' : 'decrement';
    let yDirection = point1.y < point2.y ? 'increment' : 'decrement';
    let rounds = 0;
    while((xTraveled < xDistance || yTraveled < yDistance) && rounds < 1000) {
      let x = xDirection === 'increment' ? point1.x + xTraveled : point1.x - xTraveled;
      let y = yDirection === 'increment' ? point1.y + yTraveled : point1.y - yTraveled;
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
