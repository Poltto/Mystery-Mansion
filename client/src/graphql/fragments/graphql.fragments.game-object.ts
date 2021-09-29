import { gql } from '@apollo/client';
const FullGameObject = gql`
  fragment FullGameObject on GameObject {
    positionX
    positionY
    onInteract
    image
    id
    isBlocking
  }
`;

export const GAME_OBJECT_FRAGMENTS = {
  FullGameObject
}
