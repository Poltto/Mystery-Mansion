import { IInventoryItem } from 'Types/inventoryItem';

export interface IItemSlot {
  id: number;
  inventoryItem: IInventoryItem;
  selected: boolean;
  focused: boolean;
}
