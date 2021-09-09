import { INTERACTIONS } from './statics.interactions';
import { ACTIONS } from '../redux/actions';

export const ITEM_INTERACTIONS = {

};

ITEM_INTERACTIONS[INTERACTIONS.PICK_UP_ITEM] = (interactedItems) => {
  let action = ACTIONS.ITEM_ACTIONS.PICK_UP_ITEM(interactedItems);
  return action;
};

ITEM_INTERACTIONS[INTERACTIONS.VOID] = () => {
  return;
};

