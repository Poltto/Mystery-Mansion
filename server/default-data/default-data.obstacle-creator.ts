import { IObstacleCreatorOptions, IObstacleGroup } from '../../src/types/obstacleCreator';
const OBSTACLE_STATICS = require('../../src/helpers/statics.obstacles');
import { IPoint } from '../../src/types/point';

export function DefaultDataObstacleCreator(options: IObstacleCreatorOptions) {
  function createObstacles(): IPoint[] {
    let reducer = (accumulator, currentValue) => {
      let elements = processObstacleGroup(currentValue);
      return accumulator.concat(elements);
    };
    let allPoints: IPoint[] = options.groups.reduce(reducer, []);
    return allPoints;
  }

  function processObstacleGroup(obstacleGroup: IObstacleGroup): IPoint[] {
    if(obstacleGroup.type === OBSTACLE_STATICS.TYPES.Point) {
      return combineAllPoints(new Set(obstacleGroup.points), obstacleGroup);
    } else if(obstacleGroup.type === OBSTACLE_STATICS.TYPES.Line) {
      let a = obstacleGroup.points[0];
      let b = obstacleGroup.points[1];
      let points: Set<IPoint> = createLineBetweenTwoPoints(a, b, obstacleGroup);
      return combineAllPoints(points, obstacleGroup);
    } else if (obstacleGroup.type === OBSTACLE_STATICS.TYPES.Plane) {
      let totalPoints = createPolygon(obstacleGroup);
      totalPoints = fillAreaInsidePoints(totalPoints, obstacleGroup);
      return combineAllPoints(totalPoints, obstacleGroup);
    } else if (obstacleGroup.type === OBSTACLE_STATICS.TYPES.Polygon) {
      let totalPoints = createPolygon(obstacleGroup);
      return combineAllPoints(totalPoints, obstacleGroup);
    }
  }

  function combineAllPoints(totalPoints: Set<IPoint>, obstacleGroup: IObstacleGroup) {
    let totalPointsAdjustedWithSpecialPoints;
    if(obstacleGroup.specialPoints) {
      let pointArray = [...totalPoints];
      for(let specialPoint of obstacleGroup.specialPoints) {
        let indexToReplace;
        for(let i = 0; i < pointArray.length; i++) {
          if(specialPoint.positionX === pointArray[i].positionX && specialPoint.positionY === pointArray[i].positionY) {
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
    return [...totalPointsAdjustedWithSpecialPoints];
  }

  function createPolygon(obstacleGroup): Set<IPoint> {
    let totalPoints = new Set<IPoint>([]);
    for(let i = 0; i < obstacleGroup.points.length; i++) {
      let point1 = obstacleGroup.points[i];
      let point2 = (i === obstacleGroup.points.length - 1) ? obstacleGroup.points[0] : obstacleGroup.points[i + 1];
      let points: Set<IPoint>;
      if(point1.positionX === point2.positionX && point1.positionY === point2.positionY) {
        points = new Set<IPoint>([point1]);
      } else {
        points = createLineBetweenTwoPoints(point1, point2, obstacleGroup);
      }
      totalPoints = new Set<IPoint>([...points, ...totalPoints]);
    }
    return totalPoints;
  }

  function createLineBetweenTwoPoints(point1: IPoint, point2: IPoint, obstacleGroup: IObstacleGroup): Set<IPoint> {
    let points: IPoint[] = [];
    let xDistance = Math.abs(point2.positionX - point1.positionX);
    let yDistance = Math.abs(point2.positionY - point1.positionY);
    let xTraveled = 0;
    let yTraveled = 0;
    let xDirection = point1.positionX < point2.positionX ? 'increment' : 'decrement';
    let yDirection = point1.positionY < point2.positionY ? 'increment' : 'decrement';
    let rounds = 0;
    while((xTraveled < xDistance || yTraveled < yDistance) && rounds < 1000) {
      let x = xDirection === 'increment' ? point1.positionX + xTraveled : point1.positionX - xTraveled;
      let y = yDirection === 'increment' ? point1.positionY + yTraveled : point1.positionY - yTraveled;
      rounds++;
      points.push({
        positionX: x,
        positionY: y,
        image: obstacleGroup.image,
        isBlocking: obstacleGroup.isBlocking,
        onInteract: obstacleGroup.onInteract
      });
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

  function fillAreaInsidePoints(points: Set<IPoint>, obstacleGroup): Set<IPoint> {
    let filledPoints: Set<IPoint> = new Set<IPoint>([...points]);

    for(let singlePoint of points) {
      createTestPoint(singlePoint, filledPoints, obstacleGroup);
    }

    return filledPoints;
  }

  function createTestPoint(singlePoint: IPoint, allPoints: Set<IPoint>, obstacleGroup: IObstacleGroup) {
    let testPoint = {
      positionX: singlePoint.positionX + 1,
      positionY: singlePoint.positionY
    };

    let isAcceptablePoint = [...allPoints].some(borderPoint => {
      let isIdentical = borderPoint.positionX === testPoint.positionX && borderPoint.positionY === testPoint.positionY;
      let hasPointAbove = borderPoint.positionX === testPoint.positionX && borderPoint.positionY > testPoint.positionY;
      let hasPointBelow = false;
      if(hasPointAbove && !isIdentical) {
        hasPointBelow = [...allPoints].some(secondBorderPoint => {
          return secondBorderPoint.positionX === testPoint.positionX && secondBorderPoint.positionY < testPoint.positionY;
        });
      }

      return !isIdentical  && hasPointAbove && hasPointBelow;
    });
    if(isAcceptablePoint) {
      let properTestPoint: IPoint = {
        positionX: testPoint.positionX,
        positionY: testPoint.positionY,
        image: obstacleGroup.image,
        onInteract: obstacleGroup.onInteract,
        isBlocking: obstacleGroup.isBlocking
      };
      allPoints.add(properTestPoint);
      createTestPoint(properTestPoint, allPoints, obstacleGroup);
    }
  }

  return createObstacles();
}

module.exports = DefaultDataObstacleCreator;
