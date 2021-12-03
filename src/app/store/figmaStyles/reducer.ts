// Types
import { types, IFigmaStylesState } from './types';
import IAction from "../../models/IAction";

const initialState: IFigmaStylesState = {
  styles: [],
  themesList: [],
  tokens: [],
  selectedColor: null,
  editedData: null,
  error: null,
};

export const figmaStylesReducer = (state = initialState, {type, payload}: IAction<object>) => {
  switch (type) {

    case types.FIGMA_STYLES_SET_DATA:
      return { ...state, styles: payload };

    case types.SET_TOKENS_DATA:
      return { ...state, tokens: payload };

    case types.SET_SELECTED_COLOR:
      return { ...state, selectedColor: payload };

    case types.SET_EDITED_DATA:
      return { ...state, editedData: payload };

    case types.THEMES_LIST_SET_DATA:
      return { ...state, themesList: payload };

    case types.THEMES_LIST_START_FETCHING:
      return { ...state, isFetching: true };
    case types.THEMES_LIST_STOP_FETCHING:
      return { ...state, isFetching: false };
    case types.THEMES_LIST_FETCHING_ERROR:
      return { ...state, error: payload };

    default:
      return state;
  }
};
