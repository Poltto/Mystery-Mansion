
const {gql} = require('apollo-server-express');
let Item = require('../../models/models.item.js');
let ItemSlot = require('../../models/models.item-slot.js');
let Inventory = require('../../models/models.inventory.js');
let InventoryItem = require('../../models/models.inventory-item.js');
const { Op } = require("sequelize");
let getItemCombination = require('../../helpers/itemCombiner');
const typeDefs = gql`
  extend type Query {
    items: [Item]
    item(id: ID!): Item
    itemSlots: [ItemSlot]
    inventories: [Inventory]
    inventory(id: ID!): Inventory
  }
  
  extend type Mutation {
    createItem(input: ItemInput): Item
    updateItem(id: ID!, input: ItemInput): Item
    combine(itemSlotIds: [ID]!): CombineOutput
    pickUpItem(id: ID!): ItemSlot
  }
  
  input ItemInput {
    positionX: Int,
    positionY: Int,
    onInteract: String,
    image: String,
    name: String,
    isInInventory: Boolean
  }
  
  type CombineOutput {
    newItemSlot: ItemSlot
    oldItems: [Item]
    oldItemSlots: [ItemSlot]
    newItem: Item
  }
  
  type Item {
    id: ID!
    positionX: Int,
    positionY: Int,
    onInteract: String,
    image: String,
    name: String,
    isInInventory: Boolean
  }
  
  type InventoryItem {
    id: ID!
    item: Item,
  }
  
  type Inventory {
    id: ID!
  }
  
  type ItemSlot {
    id: ID!
    inventoryItem: InventoryItem,
    inventory: Inventory
  }
`
const resolvers = {
  Query: {
    items: async() => {
      console.log("Ended up here");
      return await Item.findAll({});
    },
    item: async(obj, args, context, info) => {
      return await Item.findByPk(args.id);
    },
    itemSlots: async() => {
      return await ItemSlot.findAll({});
    }
  },
  Mutation: {
    createItem: async(_, data, dataSources) => {
      const newItem = {
        positionX: data.input.positionX,
        positionY: data.input.positionY,
        isBlocking: data.input.isBlocking,
        image: data.input.image,
        onInteract: data.input.onInteract,
        name: data.input.name
      };
      return await Item.create(newItem);
    },
    updateItem: async(_, data) => {
      let item = await (await Item.findByPk(data.id));
      for(key in data.input) {
        item[key] = data.input[key];
      }
      await item.save();
      return item;
    },
    pickUpItem: async(_, data) => {
      let promises;
      let inventoryPromise = Inventory.findOne({
        where: {
          id: 1
        }
      });
      let itemSlotPromise = ItemSlot.findOne({
        where: {
          inventoryId: 1,
          inventoryItemId: null
        },
        include: InventoryItem
      });
      let itemPromise = Item.findByPk(data.id);
      let inventory;
      let item;
      let itemSlot;

      inventoryPromise.then(result => {
        inventory = result;
      })

      itemPromise.then(result => {
        item = result;
      })

      itemSlotPromise.then(result => {
        itemSlot = result;
      })

      promises = [inventoryPromise, itemPromise, itemSlotPromise];
      let result = await Promise.allSettled(promises);
      item.isInInventory = true;
      item.positionX = 9999;
      item.positionY = 9999;
      let inventoryItem = await InventoryItem.create({
        itemId: item.id,
        inventoryId: inventory.id
      });
      let inventoryItemData = inventoryItem.get();
      await itemSlot.setInventoryItem(inventoryItem);
      let itemSlotData = itemSlot.get();
      inventoryItemData.item = item;
      itemSlotData.inventoryItem = inventoryItemData;

      return itemSlotData;
    },
    combine: async(_, data) => {
      let inventoryPromise = Inventory.findByPk(1);
      let itemSlotPromise = ItemSlot.findAll({
        where: {
          id: {
            [Op.in]: data.itemSlotIds
          }
        },
        include: [
          {
            model: InventoryItem,
            include: [{
              model: Item
            }]
          }]
      });

      let inventory;

      inventoryPromise.then(result => {
        inventory = result;
      })

      itemSlotPromise.then(result => {
        oldItemSlots = result;
      })


      let promises = [inventoryPromise, itemSlotPromise];
      await Promise.allSettled(promises);
      let inventoryItems = oldItemSlots.map(itemSlot => itemSlot.InventoryItem);
      let oldItems = inventoryItems.map(inventoryItem => inventoryItem.Item);
      let itemIds = oldItems.map(item => item.id);
      let combinationItemId = getItemCombination(oldItemSlots);
      if(combinationItemId) {
        let newItem = await Item.findByPk(combinationItemId);
        let newInventoryItem = await InventoryItem.create({
          itemId: newItem.id,
          inventoryId: inventory.id
        });
        for (let oldInventoryItem of inventoryItems) {
          await oldInventoryItem.destroy();
        }
        for (let oldItemSlot of oldItemSlots) {
          oldItemSlot.inventoryItem = null;
          oldItemSlot.selected = false;
          oldItemSlot.focused = false;
        }

        for (let oldItem of oldItems) {
          oldItem.deleted = true;
        }

        let firstAvailableItemSlot = await ItemSlot.findOne({
          where: {
            inventoryItemId: null
          }
        });

        firstAvailableItemSlot.setInventoryItem(newInventoryItem);
        let newItemSlot = await firstAvailableItemSlot.get();
        let inventoryItem = await firstAvailableItemSlot.getInventoryItem();
        inventoryItem.item = newItem;
        newItemSlot.inventoryItem = inventoryItem;
        let returnItemSlot = {
          oldItemSlots,
          newItemSlot,
          oldItems,
          newItem
        }

        return returnItemSlot;
      }
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}
