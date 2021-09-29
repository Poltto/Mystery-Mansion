import { GAME_OBJECT_FRAGMENTS } from '../fragments/graphql.fragments.game-object';

import { gql } from '@apollo/client';

const CREATE_GAME_OBJECT = gql`
  ${GAME_OBJECT_FRAGMENTS.FullGameObject}
  mutation CREATE_GAME_OBJECT($gameObject: GameObjectInput!) {
    createGameObject(gameObject: $gameObject) {
      ...FullGameObject
    }
  }
`

export const GAME_OBJECT_MUTATIONS = {
  CREATE_GAME_OBJECT
};
