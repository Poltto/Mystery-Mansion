import { ACTIONS } from '../redux/actions';


export function DialogReducer(state = {dialog: {header: undefined, content: undefined, footer: undefined}}, action) {
  if(action.type === ACTIONS.DIALOG_ACTIONS.ENUMS.OPEN_DIALOG) {
    let dialog = action.payload;
    return {
      ...state,
      dialog
    };
  } else if (action.type === ACTIONS.DIALOG_ACTIONS.ENUMS.CLOSE_DIALOG) {
    return {
      ...state,
      dialog: {
        header: null,
        content: null,
        footer: null
      }
    };
  }

  return state;

}
