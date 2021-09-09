import { Character } from '../character/character';
import { ObstacleCreator } from '../obstacle-creator/obstacleCreator';
import { ItemCreator } from '../item-creator/itemCreator';
import { GameObject } from '../endpoints/endpoint.game-object';
import { useDispatch, useSelector } from 'react-redux';
import { ACTIONS } from '../redux/actions';
import { useEffect } from 'react';
import { Item } from '../endpoints/endpoint.item';
let GAME_OBJECTS = require('../helpers/game-objects.ts');

export function MainGame(props) {
  const dispatch = useDispatch();

  const obstacles = useSelector(state => {
    return Object.values(state.ObstacleReducer.obstacles);
  });

  const items = useSelector(state => {
    return Object.values(state.ItemReducer.items);
  });


  useEffect(() => {
    GameObject.get().then((result) => {
      result.json().then((jsonResult) => {
        let newObstacles = ObstacleCreator({groups: GAME_OBJECTS}, jsonResult);
        let action = ACTIONS.OBSTACLE_ACTIONS.ADD_OBSTACLES(newObstacles);
        dispatch(action);
      });
    });

    Item.get().then((result) => {
      result.json().then((jsonResult) => {
        let newItems = ItemCreator(jsonResult);
        let action = ACTIONS.ITEM_ACTIONS.ADD_ITEMS(newItems);
        dispatch(action);
      });
    });
  }, []);

  return(
    <div className='main-container'>
      <Character/>
      {obstacles}
      {items}
    </div>
  );
}
