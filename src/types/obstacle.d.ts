export interface IObstacle {
  positionX: number;
  positionY: number;
  id: number;
  isBlocking: boolean;
  image: string;
  onInteract?: () => any;
}
