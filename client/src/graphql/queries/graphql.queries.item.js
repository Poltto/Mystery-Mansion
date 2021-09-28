const { gql } = require('@apollo/client');
const ITEM_FRAGMENTS = require('../fragments/graphql.fragments.item');

const GET_ITEMS = gql`
  ${ITEM_FRAGMENTS.FullItem}
  query GET_ITEMS {
    items {
      ...FullItem
    }
  }
`

const GET_ITEM_SLOTS = gql`
  ${ITEM_FRAGMENTS.FullItem}
  ${ITEM_FRAGMENTS.FullInventoryItem}
  ${ITEM_FRAGMENTS.FullItemSlot}

  query GET_ITEM_SLOTS {
    itemSlots {
      ...FullItemSlot
    }
  }
`


module.exports = {
  GET_ITEMS,
  GET_ITEM_SLOTS
}
