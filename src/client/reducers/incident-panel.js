export default (state = {}, { type, incidentId } = {}) => {
  switch (type) {
    case 'TOGGLE_INCIDENT_PANEL':
      return { ...state, isVisible: !state.isVisible };
    default:
      return state;
  }
};
