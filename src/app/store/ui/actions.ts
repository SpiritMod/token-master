// Types
import {types} from './types';

export const uiActions = Object.freeze({

  // Sync
  toggleModalEditColor: () => {
    return {
      type: types.UI_TOGGLE_MODAL_EDIT_COLOR,
    }
  },
  toggleModalCreateMode: () => {
    return {
      type: types.UI_TOGGLE_MODAL_CREATE_MODE,
    }
  },

  toggleLoader: () => {
    return {
      type: types.UI_TOGGLE_LOADER,
    }
  },


});
