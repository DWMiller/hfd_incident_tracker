import { combineReducers } from 'redux';

import incidents from './modules/incidents';
import incidentLoaded from './modules/incidentLoaded';
import mapSettings from './modules/mapSettings';
import incidentFilter from './modules/incidentFilter';

const rootReducer = combineReducers({
  incidents,
  incidentFilter,
  incidentLoaded,
  mapSettings,
});

export default rootReducer;
