import * as actionTypes from './actionTypes';

export const addIncident = incident => addIncidents([incident]);

export const addIncidents = incidents => ({
  type: actionTypes.ADD_INCIDENTS,
  incidents,
});

export const clearIncidents = () => ({
  type: actionTypes.CLEAR_INCIDENTS,
});

export const mapChange = settings => ({
  type: actionTypes.MAP_CHANGE,
  settings,
});

export const toggleIncidentPanel = () => ({
  type: actionTypes.TOGGLE_INCIDENT_PANEL,
});

export const toggleIncidentFilter = category => ({
  type: actionTypes.TOGGLE_INCIDENT_FILTER,
  category,
});

export const selectMultipleIncidentFilters = category => ({
  type: actionTypes.SELECT_MULTIPLE,
  category,
});

export const deselectAllIncidentFilters = () => ({
  type: actionTypes.DESELECT_ALL,
});

export const setTextFilter = text => ({
  type: actionTypes.SET_TEXT_FILTER,
  text,
});

export const toggleFilterPanel = () => ({
  type: actionTypes.TOGGLE_FILTER_PANEL,
});

export const setActiveMarker = incidentCode => ({
  type: actionTypes.SET_ACTIVE_MARKER,
  incidentCode,
});
