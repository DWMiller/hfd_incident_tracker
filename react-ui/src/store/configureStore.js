import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import reducer from './rootReducer';

import { incidentsMiddleware } from './middleware/incidents';
import { apiMiddleware } from './middleware/api';
import { socketMiddleware } from './middleware/socket';

const myMiddleware = [...incidentsMiddleware, ...apiMiddleware, socketMiddleware];

const middleware = [...getDefaultMiddleware(), ...myMiddleware];

export default preloadedState =>
  configureStore({
    reducer,
    preloadedState,
    middleware,
  });
