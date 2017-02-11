export default (state = [], { type, event, events } = {}) => {
  switch (type) {
    case 'ADD_EVENT':
      return [...state, event];
    case 'ADD_EVENTS':
      return [...state, ...events];
    case 'CLEAR_EVENTS':
      return [];
    default:
      return state;
  }
};
