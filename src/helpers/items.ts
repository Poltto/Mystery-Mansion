import { IItem } from 'Types/item';
import { INTERACTIONS } from './statics.interactions';


export const ITEMS: IItem[] = [
  {
    id: 1,
    name: 'First Item',
    isInInventory: false,
    onInteract: INTERACTIONS.PICK_UP_ITEM,
    positionX: 2,
    positionY: 2,
    image: '/images/grandma_walking_up_1.png'
  },
  {
    id: 2,
    name: 'Second Item',
    isInInventory: false,
    onInteract: INTERACTIONS.PICK_UP_ITEM,
    positionX: 3,
    positionY: 3,
    image: '/images/grandma_walking_down_1.png'
  },
  {
    id: 3,
    name: 'Third item',
    isInInventory: false,
    onInteract: INTERACTIONS.VOID,
    positionX: 9999,
    positionY: 9999,
    image: '/images/grandma_walking_left_1.png'
  }
];

module.exports = ITEMS;
