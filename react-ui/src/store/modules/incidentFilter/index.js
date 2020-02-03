import { combineReducers } from 'redux';

import collapsed from './collapsed';
import date from './date';
import textFilter from './text';
import typeFilter from './type';

export default combineReducers({
  collapsed,
  date,
  types: typeFilter,
  text: textFilter,
});
