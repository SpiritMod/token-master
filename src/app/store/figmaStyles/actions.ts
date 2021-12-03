// Types
import {IFigmaStylesState, types} from './types';

export const figmaStylesActions = Object.freeze({

  // Sync
  // setApiKey: (payload: IFigmaStylesState) => {
  //   return {
  //     type: types.SET_API_KEY,
  //     payload
  //   }
  // },
  setData: (payload: IFigmaStylesState) => {
    return {
      type: types.FIGMA_STYLES_SET_DATA,
      payload
    }
  },
  setTokensData: (payload: IFigmaStylesState) => {
    return {
      type: types.SET_TOKENS_DATA,
      payload
    }
  },
  setSelectedColor: (payload: IFigmaStylesState) => {
    return {
      type: types.SET_SELECTED_COLOR,
      payload
    }
  },
  setEditedData: (payload: IFigmaStylesState) => {
    return {
      type: types.SET_EDITED_DATA,
      payload
    }
  },
  setThemesData: (payload: IFigmaStylesState) => {
    return {
      type: types.THEMES_LIST_SET_DATA,
      payload
    }
  },

  startFetching: () => {
    return {
      type: types.THEMES_LIST_START_FETCHING
    }
  },

  stopFetching: () => {
    return {
      type: types.THEMES_LIST_STOP_FETCHING,
    }
  },

  setFetchingError: (error: any) => {
    return {
      type: types.THEMES_LIST_FETCHING_ERROR,
      error: true,
      payload: error,
    }
  },

});
