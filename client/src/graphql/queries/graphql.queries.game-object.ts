import { gql } from '@apollo/client';

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

export const GAME_OBJECT_QUERIES = {
  GET_GAME_OBJECTS
}
