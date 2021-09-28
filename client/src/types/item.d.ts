export interface IItem {
  props: IItemProps
}

export interface IItemProps {
  name: string;
  image: string;
  isInInventory: boolean;
  positionX: number;
  positionY: number;
  id: number;
  onInteract?: string;
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
