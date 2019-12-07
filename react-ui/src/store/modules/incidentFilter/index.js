import { combineReducers } from 'redux';

import typeFilter from './type';
import textFilter from './text';
import collapsed from './collapsed';

export default combineReducers({
  types: typeFilter,
  text: textFilter,
  collapsed,
});
