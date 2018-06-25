import * as actionTypes from './actionTypes';

export default (state = {}, { type, incident } = {}) => {
  switch (type) {
    case actionTypes.INCIDENT_LOADED:
      return incident;
    default:
      return state;
  }
};
