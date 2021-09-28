const { gql } = require('@apollo/client');

const GET_GAME_OBJECTS = gql`
  query GET_GAME_OBJECTS {
    gameObjects {
      id
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
