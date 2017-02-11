import { combineReducers } from 'redux';

import events from './events';
import eventFilter from './event-filter';
import eventPanel from './event-panel';
import map from './map';

const rootReducer = combineReducers({
  events,
  eventFilter,
  eventPanel,
  map
});

export default rootReducer;
