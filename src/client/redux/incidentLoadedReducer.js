import { createReducer } from '@acemarke/redux-starter-kit';

import { GET_INCIDENT_SUCCESS } from './actions/incidents';

export default createReducer(
  {},
  {
    [GET_INCIDENT_SUCCESS]: (state, action) => action.payload,
  }
);
