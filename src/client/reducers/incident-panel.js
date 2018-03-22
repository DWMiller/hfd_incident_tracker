export default (state = {}, { type, incidentId } = {}) => {
  switch (type) {
    case 'SET_ACTIVE_INCIDENT':
      return Object.assign({}, state, { active: incidentId });
    case 'TOGGLE_INCIDENT_PANEL':
      return Object.assign({}, state, { isVisible: !state.isVisible });
    default:
      return state;
  }
};
