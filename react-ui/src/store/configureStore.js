import createDebounce from 'redux-debounced';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import reducer from './rootReducer';

import { incidentsMiddleware } from './middleware/incidents';
import { socketMiddleware } from './middleware/socket';

const myMiddleware = [createDebounce(), ...incidentsMiddleware, socketMiddleware];

const middleware = [...getDefaultMiddleware(), ...myMiddleware];

export default preloadedState =>
  configureStore({
    reducer,
    preloadedState,
    middleware,
  });
