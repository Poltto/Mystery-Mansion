import { gql } from '@apollo/client';

const FullItem = gql`
  fragment FullItem on Item {
    positionX
    positionY
    onInteract
    image
    name
    isInInventory
    id
  }
`;

const FullInventoryItem = gql`
  ${FullItem}
  fragment FullInventoryItem on InventoryItem {
    id
    item {
      ...FullItem
    }
  }
`;

const FullItemSlot = gql`
  ${FullInventoryItem}
  fragment FullItemSlot on ItemSlot {
    id
    inventoryItem {
      ...FullInventoryItem
    }
  }
`;

export const ITEM_FRAGMENTS = {
  FullItem,
  FullItemSlot,
  FullInventoryItem
};
