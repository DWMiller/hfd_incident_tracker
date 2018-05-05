export function addIncident(incident) {
  return addIncidents([incident]);
}

export function addIncidents(incidents) {
  return {
    type: 'ADD_INCIDENTS',
    incidents,
  };
}

export function clearIncidents() {
  return {
    type: 'CLEAR_INCIDENTS',
  };
}

export function setActiveIncident(incidentId) {
  return {
    type: 'SET_ACTIVE_INCIDENT',
    incidentId,
  };
}

export function mapChange(settings) {
  return {
    type: 'MAP_CHANGE',
    settings,
  };
}

export function toggleIncidentPanel() {
  return {
    type: 'TOGGLE_INCIDENT_PANEL',
  };
}

export function toggleIncidentFilter(category) {
  return {
    type: 'TOGGLE_INCIDENT_FILTER',
    category,
  };
}

export function selectMultipleIncidentFilters(category) {
  return {
    type: 'SELECT_MULTIPLE',
    category,
  };
}

export function deselectAllIncidentFilters() {
  return {
    type: 'DESELECT_ALL',
  };
}

export function setTextFilter(text) {
  return {
    type: 'SET_TEXT_FILTER',
    text,
  };
}

export function toggleFilterPanel() {
  return {
    type: 'TOGGLE_FILTER_PANEL',
  };
}

export function setActiveMarker(incidentCode) {
  return {
    type: 'SET_ACTIVE_MARKER',
    incidentCode,
  };
}
