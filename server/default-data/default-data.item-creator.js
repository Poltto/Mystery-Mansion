import { ReactElement } from 'react';
import { IItem } from 'Types/item';
import { IItemCreatorOptions } from 'Types/itemCreator';
import { Item } from '../../src/item/item';

export function DefaultDataItemCreator(options: IItemCreatorOptions) {
  function createItems() {
    let reducer = (accumulator, currentValue) => {
      let element = processItem(currentValue);
      return accumulator.concat(element);
    };
    let items = options.items.reduce(reducer, []);

    return items.filter(item => {
      return !!item;
    });
  }

  function processItem(item) {
    return createItemElement(item);
  }

  function createItemElement(item) {
    return {
      positionX: item.positionX,
      positionY: item.positionY,
      id: item.id,
      key: item.id || Math.random(),
      image: item.image,
      name: item.name,
      onInteract: item.onInteract,
      isInInventory: item.isInInventory
    };

  }

  return createItems();
}
