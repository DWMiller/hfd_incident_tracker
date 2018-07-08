import moment from 'moment';

export const SET_DATE_FILTER = '[filter] SET_DATE';

export const setDateFilter = date => ({
  type: SET_DATE_FILTER,
  date,
});

const currentDate = moment().format('YYYY-MM-DD');

export default function dateFilterReducer(state = currentDate, action) {
  switch (action.type) {
    case SET_DATE_FILTER:
      return action.date;
    default:
      return state;
  }
}
