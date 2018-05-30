import * as actionTypes from './actionTypes';

export default (state = [], { type, incidents } = {}) => {
  switch (type) {
    case actionTypes.ADD_INCIDENTS:
      return [...incidents, ...state];
    case actionTypes.CLEAR_INCIDENTS:
      return [];
    default:
      return state;
  }
};
