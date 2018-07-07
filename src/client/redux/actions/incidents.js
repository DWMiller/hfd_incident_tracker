export const GET_RECENT_INCIDENTS = 'GET_RECENT_INCIDENTS';
export const RECENT_INCIDENTS_SUCCESS = 'RECENT_INCIDENTS_SUCCESS';
export const RECENT_INCIDENTS_ERROR = 'RECENT_INCIDENTS_ERROR';
export const INCIDENT_RECEIVED = 'INCIDENT_RECEIVED'; // new incident over socket

export const ADD_INCIDENTS = 'ADD_INCIDENTS';
export const CLEAR_INCIDENTS = 'CLEAR_INCIDENTS';
export const REPLACE_INCIDENTS = 'REPLACE_INCIDENTS';

export const GET_INCIDENT = ' GET_INCIDENT';
export const GET_INCIDENT_SUCCESS = ' GET_INCIDENT_SUCCESS';
export const GET_INCIDENT_ERROR = ' GET_INCIDENT_ERROR';

export const getRecentIncidents = () => ({
  type: GET_RECENT_INCIDENTS,
});

export const incidentReceived = incident => ({
  type: INCIDENT_RECEIVED,
  incident,
});

export const addIncident = incident => addIncidents([incident]);

export const getIncident = code => ({
  type: GET_INCIDENT,
  code,
});

export const addIncidents = incidents => ({
  type: ADD_INCIDENTS,
  incidents,
});

export const replaceIncidents = incidents => ({
  type: REPLACE_INCIDENTS,
  incidents,
});

export const clearIncidents = () => ({
  type: CLEAR_INCIDENTS,
});
