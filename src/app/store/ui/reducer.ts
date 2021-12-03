// Types
import { types, IUI } from './types';
import IAction from "../../models/IAction";

const initialState: IUI = {
  modalEditColor: false,
  modalCreateMode: false,
  loader: false,
};

export const uiReducer = (state = initialState, {type}: IAction<object>) => {
  switch (type) {

    case types.UI_TOGGLE_MODAL_EDIT_COLOR:
      return { ...state, modalEditColor: !state.modalEditColor };

    case types.UI_TOGGLE_MODAL_CREATE_MODE:
      return { ...state, modalCreateMode: !state.modalCreateMode };

    case types.UI_TOGGLE_LOADER:
      return { ...state, loader: !state.loader };

    default:
      return state;
  }
};
