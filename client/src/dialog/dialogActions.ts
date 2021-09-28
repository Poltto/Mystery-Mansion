export const DIALOG_ACTIONS = {

  ENUMS: {
    OPEN_DIALOG: 'OPEN_DIALOG',
    CLOSE_DIALOG: 'CLOSE_DIALOG'
  },

  OPEN_DIALOG: (dialog) => {
    return {
      type: DIALOG_ACTIONS.ENUMS.OPEN_DIALOG,
      payload: dialog
    };
  },

  CLOSE_DIALOG: (dialog) => {
    return {
      type: DIALOG_ACTIONS.ENUMS.CLOSE_DIALOG,
      payload: dialog
    };
  },
};
