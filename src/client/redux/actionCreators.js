import { push } from 'connected-react-router';

import * as actionTypes from './actionTypes';
import { recentIncidents, incidentDetails } from '../api';
import io from 'socket.io-client';

import getIcon from 'client/utils/getIcon';
//TODO - Maybe put this in utils? Create a category for processing/mutations?
const addIcon = incident => {
  incident.icon = getIcon(incident);
  return incident;
};

const convertCoordinates = incident => {
  const [lng, lat] = incident.location.coordinates;
  incident.position = { lat, lng };
  return incident;
};

const postFetchIncidentProcessing = incident => {
  incident = addIcon(incident);
  incident = convertCoordinates(incident);
  return incident;
};

/**
 ** Fetch recent incidents, replace old (populated from local storage),
 ** add new incidents after filtering for category as a lazy means of validating data
 */
export const fetchRecentIncidents = () => dispatch => {
  recentIncidents()
    .then(incidents => {
      incidents = incidents.filter(i => i.category).map(postFetchIncidentProcessing);
      dispatch(replaceIncidents(incidents));
    })
    .catch(err => {
      console.log('Could not fetch recent incidents from server');
    });
};

export const fetchIncidentDetails = code => dispatch => {
  incidentDetails(code)
    .then(incident => {
      dispatch(incidentLoaded(postFetchIncidentProcessing(incident)));
    })
    .catch(err => {
      console.log('Could not fetch incident from server');
    });
};

export const connectSocket = () => dispatch => {
  const socket = window.location.port ? io('//localhost:3001') : io();

  socket.on('incident', incident => {
    if (!incident) {
      // Server parsing is still a work in progress, skip saving an undefined object if one comes in
      return;
    }

    dispatch(addIncident(postFetchIncidentProcessing(incident)));
  });
};

export const incidentSelected = incident => dispatch => {
  dispatch(
    mapChange({
      center: {
        lng: incident.location.coordinates[0],
        lat: incident.location.coordinates[1],
      },
    })
  );

  dispatch(setActiveMarker(incident.id));
};

export const navigate = path => dispatch => {
  dispatch(push(path));
};

export const addIncident = incident => addIncidents([incident]);

export const addIncidents = incidents => ({
  type: actionTypes.ADD_INCIDENTS,
  incidents,
});

export const replaceIncidents = incidents => ({
  type: actionTypes.REPLACE_INCIDENTS,
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

export const setActiveMarker = incidentId => ({
  type: actionTypes.SET_ACTIVE_MARKER,
  incidentId,
});

export const incidentLoaded = incident => ({
  type: actionTypes.INCIDENT_LOADED,
  incident,
});
