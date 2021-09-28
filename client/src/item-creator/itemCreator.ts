import { ReactElement } from 'react';
import { IItem, IItemProps } from 'Types/item';
import { IItemCreatorOptions } from 'Types/itemCreator';
import { Item } from '../item/item';

export function ItemCreator(itemsFromServer) {
  function createItems() {
    return itemsFromServer.map(createItemElement, []).reduce((obj, item) => {
      return {...obj, [item.props.id]: item};
    }, {});
  }

  function processItem(item: IItemProps): ReactElement {
    return createItemElement(item);
  }

  function createItemElement(item: IItemProps) {
    return React.createElement(Item, {
      positionX: item.positionX,
      positionY: item.positionY,
      key: item.id,
      id: item.id,
      image: item.image,
      name: item.name,
      onInteract: item.onInteract,
      isInInventory: item.isInInventory
    });
  }

  return createItems();
}
