import { IItem } from 'Types/item';
import { IItemSlot } from 'Types/itemSlot';

export interface IItemState {
  items: {
    [id: number]: IItem
  };
  inventory: {
    isOpen: boolean,
    itemSlots: IItemSlot[]
  };

}
