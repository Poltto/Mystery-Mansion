
const {gql} = require('apollo-server-express');
let GameObject = require('../models/models.game-object.js');

const typeDefs = gql`
  extend type Query {
    gameObjects: [GameObject]
    gameObject(id: ID!): GameObject
  }
  
  extend type Mutation {
    createGameObject(gameObject) {
    }
  }
  
  type GameObject {
    id: ID!
    positionX: Int,
    positionY: Int,
    onInteract: String,
    isBlocking: Boolean,
    image: String,
  }
`

const resolvers = {
  Query: {
    gameObjects: async() => {
      console.log("Ended up here");
      return await GameObject.findAll({});
    },
    gameObject: async(obj, args, context, info) => {
      return await GameObject.findByPk(args.id);
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}
