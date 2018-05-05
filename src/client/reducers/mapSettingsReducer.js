const defaultMapSettings = {
  zoom: 12,
  center: { lat: 43.254401, lng: -79.863552 },
};

export default (state = defaultMapSettings, { type, settings } = {}) => {
  switch (type) {
    case 'MAP_CHANGE':
      return { ...state, ...settings };
    default:
      return state;
  }
};
