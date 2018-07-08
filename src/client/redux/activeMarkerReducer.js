export const SET_ACTIVE_MARKER = '[map] SET_ACTIVE_MARKER';

export const setActiveMarker = incidentId => ({
  type: SET_ACTIVE_MARKER,
  incidentId,
});

export const activeMarkerReducer = (state = null, { type, incidentId } = {}) => {
  switch (type) {
    case SET_ACTIVE_MARKER: {
      return incidentId;
    }
    default:
      return state;
  }
};

export default activeMarkerReducer;
