import { combineReducers } from 'redux';

import incidentsReducer from './incidentsReducer';
import {
  typeFilterReducer,
  textFilterReducer,
  collapsePanelReducer,
} from './incidentFilterReducers';
import incidentPanel from './incidentPanelReducer';
import activeMarkerReducer from './activeMarkerReducer';
import incidentLoadedReducer from './incidentLoadedReducer';
import dateFilterReducer from './dateFilterReducer';
import mapSettingsReducer from './mapSettingsReducer';

const rootReducer = combineReducers({
  incidents: incidentsReducer,
  filters: combineReducers({
    types: typeFilterReducer,
    text: textFilterReducer,
    isCollapsed: collapsePanelReducer,
    date: dateFilterReducer,
  }),
  incidentPanel,
  mapSettings: mapSettingsReducer,
  activeMarker: activeMarkerReducer,
  loadedIncident: incidentLoadedReducer,
});

export default rootReducer;
