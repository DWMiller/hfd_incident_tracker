import { combineReducers } from 'redux';

import incidentsReducer from './incidents';

import filterCollapseReducer from './ui/filterCollapse';

// incidentPanel,
// import incidentPanel from './incidentPanelReducer';

import activeMarkerReducer from './activeMarkerReducer';
import incidentLoadedReducer from './incidentLoadedReducer';
import mapSettingsReducer from './mapSettingsReducer';

import typeFilterReducer from './filters/type';
import textFilterReducer from './filters/text';
import dateFilterReducer from './filters/date';

const rootReducer = combineReducers({
  incidents: incidentsReducer,
  filters: combineReducers({
    types: typeFilterReducer,
    text: textFilterReducer,
    date: dateFilterReducer,
  }),
  ui: combineReducers({
    isFilterCollapsed: filterCollapseReducer,
  }),

  mapSettings: mapSettingsReducer,
  activeMarker: activeMarkerReducer,
  loadedIncident: incidentLoadedReducer,
});

export default rootReducer;
