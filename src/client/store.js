// import { applyMiddleware, createStore, compose } from 'redux';
import { createStore, compose } from 'redux';
// import { createLogger } from 'redux-logger';
// import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

import { initialState } from './config';

// const logger = createLogger();
// const middleware = [ReduxThunk, logger];

const storedState = JSON.parse(localStorage.getItem('hfd-state')) || {};

const resolvedState = Object.assign({}, initialState, storedState);

const store = createStore(
  rootReducer,
  resolvedState,
  compose(
    // applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
