import { createReducer } from '@reduxjs/toolkit';

export const MAP_CHANGE = '[map] CHANGE';

export const mapChange = settings => ({
  type: MAP_CHANGE,
  settings,
});

const defaultMapSettings = {
  zoom: 12,
  center: [43.254401, -79.863552],
};

export const mapSettingsReducer = createReducer(defaultMapSettings, {
  [MAP_CHANGE]: (state, { settings }) => ({ ...state, ...settings }),
});

export default mapSettingsReducer;

//   dispatch(
//     mapChange({
//       center: {
//         lng: incident.location.coordinates[0],
//         lat: incident.location.coordinates[1],
//       },
//     })
//   );