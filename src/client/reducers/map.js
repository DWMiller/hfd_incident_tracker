export default (state = {}, { type, settings } = {}) => {
  switch (type) {
    case 'MAP_CHANGE':
      return Object.assign({}, state, settings);
    default:
      return state;
  }
};
