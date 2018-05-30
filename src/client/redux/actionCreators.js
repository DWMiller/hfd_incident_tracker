import * as actionTypes from './actionTypes';
import { recentIncidents } from '../api';
import io from 'socket.io-client';

/**
 ** Fetch recent incidents, clear old incidents,
 ** add new incidents afterr filtering for category as a lazy means of validating data
 */
export const fetchRecentIncidents = () => dispatch => {
  recentIncidents()
    .then(incidents => {
      dispatch(clearIncidents());
      dispatch(addIncidents(incidents.filter(i => i.category)));
    })
    .catch(err => {
      console.log('Could not fetch recent incidents from server');
    });
};

export const connectSocket = () => dispatch => {
  const socket = window.location.port ? io('//localhost:3001') : io();

  socket.on('incident', incident => {
    if (!incident) {
      // Server parsing is still a work in progress, skip saving an undefined object if one comes in
      return;
    }

    dispatch(addIncident(incident));
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

  dispatch(setActiveMarker(incident.code));
};

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