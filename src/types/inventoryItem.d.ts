import { IItem } from 'Types/item';
import { IItemSlot } from 'Types/itemSlot';

export interface IInventoryItem {
  id: number;
  item: IItem;
  itemSlot: IItemSlot;
}
