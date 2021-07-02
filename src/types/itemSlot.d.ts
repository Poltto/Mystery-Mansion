import { IItem } from 'Types/item';

export interface IItemSlot {
  id: number;
  item: IItem;
  selected: boolean;
  focused: boolean;
}
