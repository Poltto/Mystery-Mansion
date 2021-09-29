const { gql } = require('@apollo/client');

const ITEM_FRAGMENTS = require('../fragments/graphql.fragments.item');



const PICK_UP_ITEM = gql`
  ${ITEM_FRAGMENTS.FullItemSlot}
  mutation PICK_UP_ITEM($id: ID!) {
    pickUpItem(id: $id) {
      ...FullItemSlot
    }
  }
`;

const COMBINE = gql`
  ${ITEM_FRAGMENTS.FullItemSlot}
  ${ITEM_FRAGMENTS.FullItem}

  mutation COMBINE($itemSlotIds: [ID]!) {
    combine(itemSlotIds: $itemSlotIds) {
      newItemSlot {
        ...FullItemSlot
      }
      oldItems {
        ...FullItem
      }
      newItem {
        ...FullItem
      }
      oldItemSlots {
        ...FullItemSlot
      }
    }
  }
`

module.exports = {
  PICK_UP_ITEM,
  COMBINE
}
