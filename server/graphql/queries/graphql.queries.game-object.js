const { gql } = require('apollo-server-express');

const GET_GAME_OBJECTS = gql`
  query GET_GAME_OBJECTS {
    gameObjects {
      positionX
      positionY
      onInteract
      isBlocking
      image
    }
  }
`

module.exports = {
  GET_GAME_OBJECTS
}
