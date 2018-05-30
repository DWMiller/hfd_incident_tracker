import * as actionTypes from './actionTypes';

export default (state = null, { type, incidentCode } = {}) => {
  switch (type) {
    case actionTypes.SET_ACTIVE_MARKER: {
      return incidentCode;
    }
    default:
      return state;
  }
};
