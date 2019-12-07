import { format } from 'date-fns';

export const SET_DATE_FILTER = '[filter] SET_DATE';

export const setDateFilter = date => ({
  type: SET_DATE_FILTER,
  date,
});

const currentDate = format(new Date(), 'yyyy-MM-dd');

export default function dateFilterReducer(state = currentDate, action) {
  switch (action.type) {
    case SET_DATE_FILTER:
      return action.date;
    default:
      return state;
  }
}
