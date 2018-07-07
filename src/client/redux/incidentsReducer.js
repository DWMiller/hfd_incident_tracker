import * as actionTypes from './actions/incidents';

export default (state = [], { type, incidents } = {}) => {
  switch (type) {
    case actionTypes.ADD_INCIDENTS:
      return [...incidents, ...state];
    case actionTypes.REPLACE_INCIDENTS:
      return [...incidents];
    case actionTypes.CLEAR_INCIDENTS:
      return [];
    default:
      return state;
  }
};
