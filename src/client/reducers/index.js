import { combineReducers } from 'redux';

import incidents from './incidents';
import { typeFilterReducer, textFilterReducer, collapsePanelReducer } from './incident-filters';
import incidentPanel from './incident-panel';
import map from './map';

const rootReducer = combineReducers({
  incidents,
  filters: combineReducers({
    types: typeFilterReducer,
    text: textFilterReducer,
    isCollapsed: collapsePanelReducer,
  }),
  incidentPanel,
  map,
});

export default rootReducer;
