import * as actionTypes from './actionTypes';

export default (state = null, { type, incidentId } = {}) => {
  switch (type) {
    case actionTypes.SET_ACTIVE_MARKER: {
      return incidentId;
    }
    default:
      return state;
  }
};
