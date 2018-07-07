import { push } from 'connected-react-router';

import * as actionTypes from './actionTypes';

import io from 'socket.io-client';

import { incidentReceived } from 'client/redux/actions/incidents';

export const connectSocket = () => dispatch => {
  const socket = window.location.port ? io('//localhost:3001') : io();

  socket.on('incident', incident => {
    if (!incident) {
      // Server parsing is still a work in progress, skip saving an undefined object if one comes in
      return;
    }

    dispatch(incidentReceived(incident));
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

export const setDateFilter = date => ({
  type: actionTypes.SET_DATE_FILTER,
  date,
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
