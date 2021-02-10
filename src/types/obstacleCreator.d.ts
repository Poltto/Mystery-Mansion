export interface IObstacleGroup {
  type: string;
  isBlocking: boolean;
  points: IPoint[];
  image: string;
  onInteract?: () => any;
}

export interface IPoint {
  x: number;
  y: number;
}

export interface IObstacleCreatorOptions {
  groups: IObstacleGroup[];
}
