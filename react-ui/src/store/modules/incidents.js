import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import getIcon from '../../utils/getIcon';

const PATH = window.location.port ? '//localhost:3001' : '';

export const fetchRecentIncidents = createAsyncThunk('incidents/fetchRecent', async () => {
  return fetch(`${PATH}/api/recent`, { method: 'GET' }).then(response => response.json());
});

const convertCoordinates = incident => {
  if (incident.location && incident.location.coordinates) {
    const [lng, lat] = incident.location.coordinates;
    incident.position = { lat, lng };
  }
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
    clearIncidents: () => {
      return [];
    },
    addIncidents: (state, action) => {
      const incidents = action.payload.filter(i => i.category).map(processIncident);
      state.push(...incidents);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRecentIncidents.fulfilled, (state, action) => {
        return action.payload.filter(i => i.category).map(processIncident);
      })
      .addCase(fetchRecentIncidents.rejected, () => {
        console.log('Could not fetch recent incidents from server');
      });
  },
});

export const { addIncidents } = incidentsSlice.actions;

export default incidentsSlice.reducer;
