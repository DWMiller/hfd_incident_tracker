import { combineReducers } from 'redux';

import events from './events';
import eventPanel from './event-panel';
import map from './map';

const rootReducer = combineReducers({
  events,
  eventPanel,
  map
});

export default rootReducer;
