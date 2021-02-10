export interface IObstacle {
  position: {
    x: number,
    y: number
  };
  id: number;
  isBlocking: boolean;
  image: string;
  onInteract?: () => any;
}
