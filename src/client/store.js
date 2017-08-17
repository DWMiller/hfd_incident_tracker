// import { applyMiddleware, createStore, compose } from 'redux';
import { createStore, compose } from 'redux';
// import { createLogger } from 'redux-logger';
// import ReduxThunk from 'redux-thunk';

import rootReducer from './reducers';

import icons from './config/icons';

// const logger = createLogger();
// const middleware = [ReduxThunk, logger];

const storedState = JSON.parse(localStorage.getItem('redux'));

const defaultState = Object.assign(
  {
    events: [],
    eventFilter: Object.values(icons).map(({ file }) => file),
    eventPanel: { active: null, isVisible: false },
    map: {
      zoom: 12,
      center: { lat: 43.254401, lng: -79.863552 },
    },
  },
  storedState || {}
);

const store = createStore(
  rootReducer,
  defaultState,
  compose(
    // applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
