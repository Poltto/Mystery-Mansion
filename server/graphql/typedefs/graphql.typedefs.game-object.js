
const {gql} = require('apollo-server-express');
let GameObject = require('../../models/models.game-object.js');

const typeDefs = gql`
  extend type Query {
    gameObjects: [GameObject]
    gameObject(id: ID!): GameObject
  }
  
  extend type Mutation {
    createGameObject(gameObject: GameObjectInput): GameObject
    updateGameObject(id: ID!, input: GameObjectInput): GameObject
  }
  
  input GameObjectInput {
    positionX: Int,
    positionY: Int,
    onInteract: String,
    isBlocking: Boolean,
    image: String,
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
  },
  Mutation: {
    createGameObject: async(_, data, dataSources) => {
      const newGameObject = {
        positionX: data.gameObject.positionX,
        positionY: data.gameObject.positionY,
        isBlocking: data.gameObject.isBlocking,
        image: data.gameObject.image,
        onInteract: data.gameObject.onInteract,
        id: data.gameObject.positionX.toString() + data.gameObject.positionY?.toString()
      };
      return await GameObject.create(newGameObject);
    },
    updateGameObject: async(_, data) => {
      let gameObject = await (await GameObject.findByPk(data.id));
      for(key in data.input) {
        gameObject[key] = data.input[key];
      }
      await gameObject.save();
      return gameObject;
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}
