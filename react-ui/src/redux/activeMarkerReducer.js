import { createReducer } from '@reduxjs/toolkit';

export const SET_ACTIVE_MARKER = '[map] SET_ACTIVE_MARKER';

export const setActiveMarker = incidentId => ({
  type: SET_ACTIVE_MARKER,
  incidentId,
});

export const activeMarkerReducer = createReducer(null, {
  [SET_ACTIVE_MARKER]: (state, { incidentId }) => incidentId,
});

export default activeMarkerReducer;
