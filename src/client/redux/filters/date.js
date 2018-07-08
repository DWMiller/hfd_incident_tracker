import moment from 'moment';

export const SET_DATE_FILTER = '[filter] SET_DATE';

export const setDateFilter = date => ({
  type: SET_DATE_FILTER,
  date,
});

const currentDate = moment().format('YYYY-MM-DD');

export const dateFilterReducer = (state = currentDate, { type, date } = {}) => {
  switch (type) {
    case SET_DATE_FILTER:
      return date;
    default:
      return state;
  }
};

export default dateFilterReducer;
