import { push } from 'connected-react-router';

// import * as actionTypes from './actionTypes';

// export const incidentSelected = incident => dispatch => {
//   dispatch(
//     mapChange({
//       center: {
//         lng: incident.location.coordinates[0],
//         lat: incident.location.coordinates[1],
//       },
//     })
//   );

//   dispatch(setActiveMarker(incident.id));
// };

export const navigate = path => dispatch => {
  dispatch(push(path));
};

// export const toggleIncidentPanel = () => ({
//   type: actionTypes.TOGGLE_INCIDENT_PANEL,
// });
