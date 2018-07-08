export const MAP_CHANGE = '[map] CHANGE';

export const mapChange = settings => ({
  type: MAP_CHANGE,
  settings,
});

const defaultMapSettings = {
  zoom: 12,
  center: { lat: 43.254401, lng: -79.863552 },
};

export const mapSettingsReducer = (state = defaultMapSettings, { type, settings } = {}) => {
  switch (type) {
    case MAP_CHANGE:
      return { ...state, ...settings };
    default:
      return state;
  }
};

export default mapSettingsReducer;
