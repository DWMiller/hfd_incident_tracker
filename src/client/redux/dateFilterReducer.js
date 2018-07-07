import * as actionTypes from './actionTypes';
import moment from 'moment';

const currentDate = moment().format('YYYY-MM-DD');

export default (state = currentDate, { type, date } = {}) => {
  switch (type) {
    case actionTypes.SET_DATE_FILTER:
      return date;
    default:
      return state;
  }
};
