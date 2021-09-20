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

export function MainGame(props) {
  const dispatch = useDispatch();

  const obstacles = useSelector((state: RootState) => {
    return Object.values(state.ObstacleReducer.obstacles);
  });

  const items = useSelector((state: RootState) => {
    return Object.values(state.ItemReducer.items);
  });


  useEffect(() => {
    GameObject.get().then((result) => {
      result.json().then((jsonResult) => {
        let newObstacles = ObstacleCreator(jsonResult);
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

    ItemSlot.get().then((result) => {
      result.json().then((jsonResult) => {
        console.log(jsonResult);
        let action = ACTIONS.ITEM_ACTIONS.INIT_ITEM_SLOTS(jsonResult);
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
