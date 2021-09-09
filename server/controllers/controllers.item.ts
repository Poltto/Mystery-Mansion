
let ItemController = () => {
  let Item = require('../models/models.item.js');

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

    pickUpItem: (req, res) => {
      console.log("REQUEST BODY: ", req.params);
      res.send("OK");
    }
  };
};


module.exports = ItemController();
