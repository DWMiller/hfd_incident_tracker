export const GET_RECENT_INCIDENTS = '[incidents] GET_RECENT';
export const RECENT_INCIDENTS_SUCCESS = '[incidents] _GET_RECENT_SUCCESS';
export const RECENT_INCIDENTS_ERROR = '[incidents] GET_RECENT_ERROR';

export const GET_INCIDENT = ' GET_INCIDENT';
export const GET_INCIDENT_SUCCESS = ' GET_INCIDENT_SUCCESS';
export const GET_INCIDENT_ERROR = ' GET_INCIDENT_ERROR';

export const INCIDENT_RECEIVED = '[socket] INCIDENT_RECEIVED';

export const getRecentIncidents = () => ({
  type: GET_RECENT_INCIDENTS,
});

export const getIncident = code => ({
  type: GET_INCIDENT,
  code,
});

export function subscribeIncidents() {
  return {
    event: 'incident',
    handle: INCIDENT_RECEIVED,
  }
}