import { combineReducers } from 'redux';

import incidents from './incidents';
import { typeFilterReducer, textFilterReducer, collapsePanelReducer } from './incident-filters';
import incidentPanel from './incident-panel';
import activeMarker from './activeMarkerReducer';

import mapSettings from './mapSettingsReducer';

const rootReducer = combineReducers({
  incidents,
  filters: combineReducers({
    types: typeFilterReducer,
    text: textFilterReducer,
    isCollapsed: collapsePanelReducer,
  }),
  incidentPanel,
  mapSettings,
  activeMarker,
});

export default rootReducer;
