import { combineReducers } from 'redux';

import incidentsReducer from './incidentsReducer';
import {
  typeFilterReducer,
  textFilterReducer,
  collapsePanelReducer,
} from './incidentFilterReducers';
import incidentPanel from './incidentPanelReducer';
import activeMarkerReducer from './activeMarkerReducer';

import mapSettingsReducer from './mapSettingsReducer';

const rootReducer = combineReducers({
  incidents: incidentsReducer,
  filters: combineReducers({
    types: typeFilterReducer,
    text: textFilterReducer,
    isCollapsed: collapsePanelReducer,
  }),
  incidentPanel,
  mapSettings: mapSettingsReducer,
  activeMarker: activeMarkerReducer,
});

export default rootReducer;
