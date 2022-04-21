import { configureStore } from '@reduxjs/toolkit';
import reduxLogger from 'redux-logger';

import gameReducer from './games/game.slice';

export function initStore({ preloadedState = {} } = {}) {
  const middlewares = [];
  if (process.env.NODE_ENV === 'development') middlewares.push(reduxLogger);

  return configureStore({
    reducer: {
      gameState: gameReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
    preloadedState,
  });
}
