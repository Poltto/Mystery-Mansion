
let GameObjectController = () => {
  let GameObject = require('../models/models.game-object.js');

  return {
    create: (req, res) => {
      if (!req.body) {
        res.status(400).send({
          message: 'Content can not be empty!'
        });
      }
      let positionX = req.body.positionX;
      let positionY = req.body.positionY;

      const newGameObject = {
        positionX,
        positionY,
        isBlocking: req.body.isBlocking,
        image: req.body.image,
        onInteract: req.body.onInteract,
        id: positionX.toString() + positionY?.toString()
      };

      GameObject.create(newGameObject).then ((data) => {
        res.send(data);
      }, (error) => {
        res.status(error.status).send({
          message: error.message
        })
      });
    },

    get: (req, res) => {
      if(req.params.id) {
        GameObject.findByPk(req.params.id).then((data) => {
          res.send(data);
        }, (error) => {
          res.status(error.status).send({message: error.message});
        });
      } else {
        GameObject.findAll({}).then((data) => {
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

    }
  };
};


module.exports = GameObjectController();
