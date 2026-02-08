import { configureStore } from '@reduxjs/toolkit';
import reducer from './rootReducer';

export default preloadedState =>
  configureStore({
    reducer,
    preloadedState,
  });
