export const activeMarkerReducer = (state = null, { type, incidentCode } = {}) => {
  switch (type) {
    case 'SET_ACTIVE_MARKER': {
      return incidentCode;
    }
    default:
      return state;
  }
};
