module.exports = app => {
  const ItemController = require('../controllers/controllers.item.ts');

  app.post('/api/item', ItemController.create);

  app.post('/api/item/pickUpItem', ItemController.pickUpItem);

  app.get('/api/item', ItemController.get);

  app.get('/api/item/:id', ItemController.get);

  app.put('/api/item/:id', ItemController.update);

  app.delete('/api/item/?id', ItemController.delete);
};
