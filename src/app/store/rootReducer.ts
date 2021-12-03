// Core
import { combineReducers } from 'redux';

// Reducers
import {figmaStylesReducer as figmaStyles} from './figmaStyles/reducer';
import {uiReducer as ui} from './ui/reducer';

export const rootReducer = combineReducers({
  figmaStyles,
  ui,
});
