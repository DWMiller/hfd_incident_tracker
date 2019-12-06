import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, createStore, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './rootReducer';

import { incidentsMiddleware } from './middleware/incidents';
import { apiMiddleware } from './middleware/api';
import { socketMiddleware } from './middleware/socket';

export const history = createBrowserHistory();

const myMiddleware = [...incidentsMiddleware, ...apiMiddleware, socketMiddleware()];

const middleware = [routerMiddleware(history), ReduxThunk];

const storedState = JSON.parse(localStorage.getItem('hfd-state')) || {};

const initialState = Object.assign({}, storedState);

const store = createStore(
  connectRouter(history)(rootReducer),
  initialState,
  compose(
    applyMiddleware(...middleware, ...myMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;