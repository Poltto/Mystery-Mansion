import { createStore, applyMiddleware } from 'redux';
import { REDUCERS } from './reducers';
import thunk from 'redux-thunk';
export const store = createStore(REDUCERS, applyMiddleware(thunk));
