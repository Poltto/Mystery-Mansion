import { ReactElement } from 'react';
import { IItem } from 'Types/item';
import { IItemCreatorOptions } from 'Types/itemCreator';
import { Item } from '../item/item';

export function ItemCreator(options: IItemCreatorOptions) {
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

  function processItem(item: IItem): ReactElement {
    return createItemElement(item);
  }

  function createItemElement(item: IItem) {
    if(!item.isInInventory) {
      return React.createElement(Item,
        {initialPosition: item.position,
          key: item.id || Math.random(),
          id: item.id || Math.random(),
          image: item.image,
          name: item.name,
          onInteract: item.onInteract,
          isInInventory: item.isInInventory
        });
    } else {
      return;
    }

  }

  return createItems();
}
