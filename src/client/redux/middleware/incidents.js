import {
  GET_RECENT_INCIDENTS,
  RECENT_INCIDENTS_SUCCESS,
  RECENT_INCIDENTS_ERROR,
  GET_INCIDENT,
  GET_INCIDENT_SUCCESS,
  GET_INCIDENT_ERROR,
} from 'client/redux/actions/incidents';

import { INCIDENT_RECEIVED } from '../actions/incidents';

import { addIncident, replaceIncidents } from 'client/redux/incidents';

import { apiRequest } from 'client/redux/actions/api';

import getIcon from 'client/utils/getIcon';

const PATH = window.location.port ? '//localhost:3001' : '';

const convertCoordinates = incident => {
  const [lng, lat] = incident.location.coordinates;
  incident.position = { lat, lng };
  return incident;
};

const addIcon = incident => {
  incident.icon = getIcon(incident);
  return incident;
};

const processIncident = incident => {
  incident = addIcon(incident);
  incident = convertCoordinates(incident);
  return incident;
};

/**
 * Middlewares
 */

export const getRecentIncidents = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === GET_RECENT_INCIDENTS) {
    dispatch(
      apiRequest(
        'GET',
        `${PATH}/api/recent`,
        null,
        RECENT_INCIDENTS_SUCCESS,
        RECENT_INCIDENTS_ERROR
      )
    );
  }
};

const getRecentIncidentsSuccess = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === RECENT_INCIDENTS_SUCCESS) {
    // filtering for category as a lazy means of validating data
    const incidents = action.payload.filter(i => i.category).map(processIncident);
    dispatch(replaceIncidents(incidents));
  }
};

const getRecentIncidentsError = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === RECENT_INCIDENTS_ERROR) {
    console.log('Could not fetch recent incidents from server');
  }
};

// New incident like a socket update
const incidentReceived = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === INCIDENT_RECEIVED) {
    const incident = processIncident(action.payload);

    dispatch(addIncident(incident));
  }
};

const getIncident = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === GET_INCIDENT) {
    dispatch(
      apiRequest(
        'GET',
        `${PATH}/api/incident/${action.code}`,
        null,
        GET_INCIDENT_SUCCESS,
        GET_INCIDENT_ERROR
      )
    );
  }
};

const getIncidentSuccess = ({ dispatch }) => next => action => {
  if (action.type === GET_INCIDENT_SUCCESS) {
    action.payload = processIncident(action.payload);
  }

  next(action);
};

const getIncidentError = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === GET_INCIDENT_ERROR) {
    console.log('Could not fetch incident from server');
  }
};

export const incidentsMiddleware = [
  getRecentIncidents,
  getRecentIncidentsSuccess,
  getRecentIncidentsError,
  getIncident,
  getIncidentSuccess,
  getIncidentError,
  incidentReceived,
];
