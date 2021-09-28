import { Character } from '../character/character';
import { ObstacleCreator } from '../obstacle-creator/obstacleCreator';
import { ItemCreator } from '../item-creator/itemCreator';
import { GameObject } from '../endpoints/endpoint.game-object';
import { useDispatch, useSelector } from 'react-redux';
import { ACTIONS } from '../redux/actions';
import { useEffect } from 'react';
import { Item } from '../endpoints/endpoint.item';
import {RootState} from "../redux/reducers";
import { ItemSlot } from '../endpoints/endpoint.item-slot';
import { gql, useQuery } from '@apollo/client';
const GAME_OBJECT_QUERIES = require('../graphql/queries/graphql.queries.game-object');
const ITEM_QUERIES = require('../graphql/queries/graphql.queries.item');
export function MainGame(props) {
  const dispatch = useDispatch();

  const obstacles = useSelector((state: RootState) => {
    return Object.values(state.ObstacleReducer.obstacles);
  });

  const items = useSelector((state: RootState) => {
    return Object.values(state.ItemReducer.items);
  });

  useQuery(GAME_OBJECT_QUERIES.GET_GAME_OBJECTS, {
    onCompleted: (data) => {
      let newObstacles = ObstacleCreator(data.gameObjects);
      let action = ACTIONS.OBSTACLE_ACTIONS.ADD_OBSTACLES(newObstacles);
      dispatch(action);
    }
  })

  useQuery(ITEM_QUERIES.GET_ITEMS, {
    onCompleted: (data) => {
      let newObstacles = ItemCreator(data.items);
      let action = ACTIONS.ITEM_ACTIONS.ADD_ITEMS(newObstacles);
      dispatch(action);
    }
  })

  useQuery(ITEM_QUERIES.GET_ITEM_SLOTS, {
    onCompleted: (data) => {
      let action = ACTIONS.ITEM_ACTIONS.INIT_ITEM_SLOTS(data.itemSlots);
      dispatch(action);
    }
  })

  return(
    <div className='main-container'>
      <Character/>
      {obstacles}
      {items}
    </div>
  );
}
