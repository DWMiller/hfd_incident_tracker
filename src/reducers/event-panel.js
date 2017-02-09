export default (state = {}, { type, eventId } = {}) => {
  switch (type) {
    case 'SET_ACTIVE_EVENT':
      return Object.assign({}, state, { active: eventId });
    case 'TOGGLE_EVENT_PANEL':
      return Object.assign({}, state, { isVisible: !state.isVisible });
    default:
      return state;
  }
};
