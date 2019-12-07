import { combineReducers } from 'redux';

import activeMarker from './modules/activeMarker';
import incidents from './modules/incidents';
import incidentLoaded from './modules/incidentLoaded';
import mapSettings from './modules/mapSettings';
import incidentFilter from './modules/incidentFilter';

const rootReducer = combineReducers({
  activeMarker,
  incidents,
  incidentFilter,
  incidentLoaded,
  mapSettings,
});

export default rootReducer;
