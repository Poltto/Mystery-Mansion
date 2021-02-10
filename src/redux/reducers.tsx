import { CharacterReducer } from '../character/characterReducer';
import {combineReducers} from 'redux';
import { ObstacleReducer } from '../obstacle/obstacleReducer';
import { AppReducer } from '../app.reducer';

export const REDUCERS = combineReducers({
  CharacterReducer,
  ObstacleReducer,
  AppReducer
});
