import { combineReducers } from 'redux';

import events from './events';
import { typeFilterReducer, textFilterReducer } from './event-filters';
import eventPanel from './event-panel';
import map from './map';

const rootReducer = combineReducers({
  events,
  filters: combineReducers({ types: typeFilterReducer, text: textFilterReducer }),
  eventPanel,
  map,
});

export default rootReducer;
