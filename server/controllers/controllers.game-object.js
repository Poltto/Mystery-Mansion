
let GameObjectController = () => {
  let GameObject = require('../models/models.game-object.js');

  return {
    create: (req, res) => {
      if (!req.body) {
        res.status(400).send({
          message: 'Content can not be empty!'
        });
      }

      const newGameObject = new GameObject({
        positionX: req.body.positionX,
        positionY: req.body.positionY
      });

      GameObject.create(newGameObject, (err, data) => {
        if(err) {
          res.status(err.status).send({
            message: err.message
          })
        } else {
          res.send(data);
        }
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
