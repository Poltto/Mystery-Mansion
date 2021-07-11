export interface IItem {
  name: string;
  image: string;
  isInInventory: boolean;
  position: {
    x: number,
    y: number
  };
  id: number;
  onInteract?: (allItems: IItem[]) => any;
  itemSlotId?: number;
}
