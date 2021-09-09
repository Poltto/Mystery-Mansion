import { IPoint } from 'Types/point';

export interface IObstacleGroup {
  type: string;
  isBlocking: boolean;
  points: IPoint[];
  image: string;
  onInteract?: string;
  specialPoints?: IPoint[];
}

export interface IObstacleCreatorOptions {
  groups: IObstacleGroup[];
}
