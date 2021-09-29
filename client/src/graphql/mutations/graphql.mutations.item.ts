import { gql } from '@apollo/client';

import { ITEM_FRAGMENTS } from '../fragments/graphql.fragments.item';


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

export const ITEM_MUTATIONS = {
  PICK_UP_ITEM,
  COMBINE
};
