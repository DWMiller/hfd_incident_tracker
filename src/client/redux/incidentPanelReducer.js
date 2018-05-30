import * as actionTypes from './actionTypes';

export default (state = {}, { type, incidentId } = {}) => {
  switch (type) {
    case actionTypes.TOGGLE_INCIDENT_PANEL:
      return { ...state, isVisible: !state.isVisible };
    default:
      return state;
  }
};
