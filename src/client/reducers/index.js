import { combineReducers } from 'redux';

import incidents from './incidents';
import { typeFilterReducer, textFilterReducer } from './incident-filters';
import incidentPanel from './incident-panel';
import map from './map';

const rootReducer = combineReducers({
  incidents,
  filters: combineReducers({ types: typeFilterReducer, text: textFilterReducer }),
  incidentPanel,
  map,
});

export default rootReducer;
