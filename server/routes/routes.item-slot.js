module.exports = app => {
  const ItemSlotController = require('../controllers/controllers.item-slot.js');
  
  app.get('/api/itemSlot', ItemSlotController.get);

  app.get('/api/itemSlot/:id', ItemSlotController.get);

  app.put('/api/itemSlot/:id', ItemSlotController.update);

  app.delete('/api/itemSlot/?id', ItemSlotController.delete);
};
