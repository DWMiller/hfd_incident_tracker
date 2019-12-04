import { createReducer } from '@reduxjs/toolkit';

import * as actionTypes from './actionTypes';

function toggleIncidentPanel(state, action) {
  state.isVisible = !state.isVisible;
}

export default createReducer(
  {},
  {
    [actionTypes.TOGGLE_INCIDENT_PANEL]: toggleIncidentPanel,
  }
);
