module.exports = app => {
  const GameObjectController = require('../controllers/controllers.game-object.ts');

  app.post('/api/gameObject', GameObjectController.create);

  app.get('/api/gameObject', GameObjectController.get);

  app.get('/api/gameObject/:id', GameObjectController.get);

  app.put('/api/gameObject/:id', GameObjectController.update);

  app.delete('/api/gameObject/?id', GameObjectController.delete);
};
