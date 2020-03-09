import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { processIncident } from './incidents';

const PATH = window.location.port ? '//localhost:3001' : '';

export const fetchIncident = createAsyncThunk('incident/fetch', async code => {
  return fetch(`${PATH}/api/incident/${code}`, { method: 'GET' }).then(response => response.json());
});

const incidentSlice = createSlice({
  name: 'incident',
  initialState: null,
  extraReducers: {
    [fetchIncident.fulfilled]: (state, action) => {
      return processIncident(action.payload);
    },
    [fetchIncident.rejected]: (state, action) => {
      console.log('Could not fetch incident from server');
      return state;
    },
  },
});

export default incidentSlice.reducer;
