let ItemController = () => {
  let Item = require('../models/models.item.js');
  let Inventory = require('../models/models.inventory.js');
  let InventoryItem = require('../models/models.inventory-item.js');
  let ItemSlot = require('../models/models.item-slot.js');
  let ItemCombiner = require('../helpers/itemCombiner.js');
  const { Op } = require("sequelize");

  return {
    create: (req, res) => {
      if (!req.body) {
        res.status(400).send({
          message: 'Content can not be empty!'
        });
      }

      const newItem = new Item({
        positionX: req.body.positionX,
        positionY: req.body.positionY,
        onInteract: req.body.onInteract,
        isInInventory: req.body.isInInventory,
        id: req.body.id
      });

      Item.create(newItem, (err, data) => {
        if(err) {
          res.status(err.status).send({
            message: err.message
          });
        } else {
          res.send(data);
        }
      });
    },

    get: (req, res) => {
      if(req.params.id) {
        Item.findByPk(req.params.id).then((data) => {
          res.send(data);
        }, (error) => {
          res.status(error.status).send({message: error.message});
        });
      } else {
        Item.findAll({}).then((data) => {
          res.send(data);
        }, (error) => {
          res.status(error.status).send({
            message: error.message
          });
        });
      }
    },

    update: (req, res) => {

    },

    delete: (req, res) => {

    },

    pickUpItem: async (req, res) => {
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
      let itemPromise = Item.findByPk(req.body.itemId);
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
      Promise.allSettled(promises).then( async (result) => {
        item.isInInventory = true;
        let inventoryItem = await InventoryItem.create({
          itemId: item.id,
          inventoryId: inventory.id
        });
        let inventoryItemData = inventoryItem.get();
        await itemSlot.setInventoryItem(inventoryItem);
        let itemSlotData = itemSlot.get();
        inventoryItemData.item = item;
        itemSlotData.inventoryItem = inventoryItemData;

        let resultObject = {
          itemSlot: itemSlotData,
          item,
          inventoryItem: inventoryItemData
        };
        res.send(resultObject);
      });
    },

    combine: async (req, res) => {
      let promises;
      let oldItemSlots;
      let inventoryPromise = Inventory.findByPk(1);
      let itemSlotPromise = ItemSlot.findAll({
        where: {
          id: {
            [Op.in]: req.body.itemSlotIds
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

      promises = [inventoryPromise, itemSlotPromise];
      Promise.allSettled(promises).then( async (result) => {
        let inventoryItems = oldItemSlots.map(itemSlot => itemSlot.InventoryItem);
        let oldItems = inventoryItems.map(inventoryItem => inventoryItem.Item);
        let itemIds = oldItems.map(item => item.id);
        let combinationItemId = ItemCombiner(itemIds);
        if(combinationItemId) {
          let newItem = await Item.findByPk(combinationItemId);
          let newInventoryItem = await InventoryItem.create({
            itemId: newItem.id,
            inventoryId: inventory.id
          });
          for(let oldInventoryItem of inventoryItems) {
            await oldInventoryItem.destroy();
          }
          for(let oldItemSlot of oldItemSlots) {
            oldItemSlot.inventoryItem = null;
            oldItemSlot.selected = false;
            oldItemSlot.focused = false;
          }

          for(let oldItem of oldItems) {
            oldItem.deleted = true;
          }
a
          let firstAvailableItemSlot = await ItemSlot.findOne({
            where: {
              inventoryItemId: null
            }
          });

          firstAvailableItemSlot.setInventoryItem(newInventoryItem);
          let itemSlot = await firstAvailableItemSlot.get();
          let inventoryItem = await firstAvailableItemSlot.getInventoryItem();
          inventoryItem.item = newItem;
          itemSlot.inventoryItem = inventoryItem;
          let returnItemSlot = {
            oldItemSlots,
            itemSlot,
            oldItems,
            inventoryItem,
            newItem
          }

          res.send(returnItemSlot);
        } else {

        }
      });
    }
  };
};


module.exports = ItemController();
