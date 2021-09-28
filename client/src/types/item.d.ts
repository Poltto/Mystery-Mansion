export interface IItem {
  name: string;
  image: string;
  isInInventory: boolean;
  positionX: number;
  positionY: number;
  id: number;
  onInteract?: string;
  itemSlotId?: number;
}

export interface IItemElement {
  props: {
    name: string;
    image: string;
    isInInventory: boolean;
    positionX: number;
    positionY: number;
    id: number;
    onInteract?: string;
    itemSlotId?: number;
  };
}
