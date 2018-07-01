import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, createStore, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './rootReducer';

import { initialState as defaultState } from 'client/config';

export const history = createBrowserHistory();

const middleware = [routerMiddleware(history), ReduxThunk];

const storedState = JSON.parse(localStorage.getItem('hfd-state')) || {};

const initialState = Object.assign({}, defaultState, storedState);

const store = createStore(
  connectRouter(history)(rootReducer),
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
