import { createReducer } from '@reduxjs/toolkit';

export const ADD_INCIDENTS = '[incidents] ADD';
export const CLEAR_INCIDENTS = '[incidents] CLEAR';
export const REPLACE_INCIDENTS = '[incidents] REPLACE';

export const addIncidents = incidents => ({
  type: ADD_INCIDENTS,
  incidents,
});

export const addIncident = incident => addIncidents([incident]);

export const replaceIncidents = incidents => ({
  type: REPLACE_INCIDENTS,
  incidents,
});

export const clearIncidents = () => ({
  type: CLEAR_INCIDENTS,
});

export default createReducer([], {
  [ADD_INCIDENTS]: (state, { incidents }) => [...incidents, ...state],
  [REPLACE_INCIDENTS]: (state, { incidents }) => [...incidents],
  [CLEAR_INCIDENTS]: () => [],
});
