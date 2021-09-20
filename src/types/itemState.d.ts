import { IItem } from 'Types/item';
import { IItemSlot } from 'Types/itemSlot';
import { IInventoryItem } from 'Types/inventoryItem';

export interface IItemState {
  items: {
    [id: number]: IItem
  };
  inventoryItems: IInventoryItem[];
  inventory: {
    isOpen: boolean,
    itemSlots: IItemSlot[]
  }

}
