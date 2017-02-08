export default (state = {}, { type, eventId } = {}) => {
  switch (type) {
    case 'SET_ACTIVE_EVENT':
      return { active: eventId };
    default:
      return state;
  }
};
