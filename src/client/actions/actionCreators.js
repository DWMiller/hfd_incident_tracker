export const addIncident = incident => addIncidents([incident]);

export const addIncidents = incidents => ({
  type: 'ADD_INCIDENTS',
  incidents,
});

export const clearIncidents = () => ({
  type: 'CLEAR_INCIDENTS',
});

export const setActiveIncident = incidentId => ({
  type: 'SET_ACTIVE_INCIDENT',
  incidentId,
});

export const mapChange = settings => ({
  type: 'MAP_CHANGE',
  settings,
});

export const toggleIncidentPanel = () => ({
  type: 'TOGGLE_INCIDENT_PANEL',
});

export const toggleIncidentFilter = category => ({
  type: 'TOGGLE_INCIDENT_FILTER',
  category,
});

export const selectMultipleIncidentFilters = category => ({
  type: 'SELECT_MULTIPLE',
  category,
});

export const deselectAllIncidentFilters = () => ({
  type: 'DESELECT_ALL',
});

export const setTextFilter = text => ({
  type: 'SET_TEXT_FILTER',
  text,
});

export const toggleFilterPanel = () => ({
  type: 'TOGGLE_FILTER_PANEL',
});

export const setActiveMarker = incidentCode => ({
  type: 'SET_ACTIVE_MARKER',
  incidentCode,
});
