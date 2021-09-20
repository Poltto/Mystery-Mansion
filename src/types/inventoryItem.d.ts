import { IItem } from 'Types/item';

export interface IInventoryItem {
  id: number;
  item: IItem;
  itemSlotId: number;
}
