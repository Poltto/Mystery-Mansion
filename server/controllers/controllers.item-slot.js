let ItemSlotController = () => {
  let ItemSlot = require('../models/models.item-slot.js');

  return {

    get: (req, res) => {
      if(req.params.id) {
        ItemSlot.findByPk(req.params.id).then((data) => {
          res.send(data);
        }, (error) => {
          res.status(error.status).send({message: error.message});
        });
      } else {
        ItemSlot.findAll({}).then((data) => {
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

  };
};


module.exports = ItemSlotController();
