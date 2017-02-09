export default (state = [], { type, category } = {}) => {
  switch (type) {
    case 'TOGGLE_EVENT_FILTER':
      const isActive = state.findIndex(t => t === category);
      if (isActive === -1) {
        return [...state, category];
      }
      return [...state.slice(0, isActive), ...state.slice(isActive + 1)];
    default:
      return state;
  }
};
