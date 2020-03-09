import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import getIcon from '../../utils/getIcon';

const PATH = window.location.port ? '//localhost:3001' : '';

export const fetchRecentIncidents = createAsyncThunk('incidents/fetchRecent', async () => {
  return fetch(`${PATH}/api/recent`, { method: 'GET' }).then(response => response.json());
});

const convertCoordinates = incident => {
  const [lng, lat] = incident.location.coordinates;
  incident.position = { lat, lng };
  return incident;
};

const addIcon = incident => {
  incident.icon = getIcon(incident);
  return incident;
};

export const processIncident = incident => {
  incident = addIcon(incident);
  incident = convertCoordinates(incident);
  return incident;
};

const incidentsSlice = createSlice({
  name: 'incidents',
  initialState: [],
  reducers: {
    clearIncidents: (state, action) => {
      state = [];
    },
    addIncidents: (state, action) => {
      const incidents = action.payload.filter(i => i.category).map(processIncident);
      state.push(...incidents);
    },
  },
  extraReducers: {
    [fetchRecentIncidents.fulfilled]: (state, action) => {
      return action.payload.filter(i => i.category).map(processIncident);
    },
    [fetchRecentIncidents.rejected]: (state, action) => {
      console.log('Could not fetch recent incidents from server');
      return state;
    },
  },
});

export const { addIncidents } = incidentsSlice.actions;

export default incidentsSlice.reducer;
