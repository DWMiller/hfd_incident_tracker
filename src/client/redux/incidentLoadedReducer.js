import { GET_INCIDENT_SUCCESS } from './actions/incidents';

export default (state = {}, { type, payload } = {}) => {
  switch (type) {
    case GET_INCIDENT_SUCCESS:
      return payload;
    default:
      return state;
  }
};
