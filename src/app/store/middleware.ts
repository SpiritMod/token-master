// Core
import {AnyAction, compose, Dispatch, Middleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

export const logger: Middleware<{}, any, Dispatch<AnyAction>> = createLogger({
  duration: true,
  collapsed: true,
  colors: {
    title: (action) => {
      return action.error ? 'firebrick' : 'deepskyblue';
    },
    prevState: () => '#1C5FAF',
    action:    () => '#149945',
    nextState: () => '#A47104',
    error:     () => '#ff0005',
  }
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const developmentEnvironment = process.env.NODE_ENV === 'development';
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ;
const composeEnhancers = developmentEnvironment && devtools ? devtools : compose;

const middleware = [thunk];

if (developmentEnvironment) {
  // @ts-ignore
  middleware.push(logger);
}

export { composeEnhancers, middleware };
