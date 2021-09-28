const { gql } = require('@apollo/client');

const GET_ITEMS = gql`
  query GET_ITEMS {
    items {
      positionX
      positionY
      onInteract
      image
      name
      isInInventory
      id
    }
  }
`

const GET_ITEM_SLOTS = gql`
  query GET_ITEM_SLOTS {
    itemSlots {
      id
      inventoryItem {
        item {
          id
        }
        inventory {
          id
        }
      }
      inventory {
        id
      }
    }
  }
`


module.exports = {
  GET_ITEMS,
  GET_ITEM_SLOTS
}
