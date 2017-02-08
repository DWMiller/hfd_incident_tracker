import { applyMiddleware, createStore, compose } from 'redux';
import createLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import rootReducer from './root-reducer';

const logger = createLogger();
const middleware = [ReduxThunk, logger];

const store = createStore(
  rootReducer,
  {
    events: [],
    eventPanel: { active: null },
    map: {
      zoom: 12,
      center: { lat: 43.254401, lng: -79.863552 }
    }
  },
  compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
