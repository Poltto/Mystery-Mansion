export interface IObstacleGroup {
  type: string;
  isBlocking: boolean;
  points: IPoint[];
  image: string;
  onInteract?: () => any;
  specialPoints?: IPoint[];
}

export interface IPoint {
  x: number;
  y: number;
  image?: string;
  isBlocking?: boolean;
}

export interface IObstacleCreatorOptions {
  groups: IObstacleGroup[];
}
