import { createSelector } from 'reselect';

import { filterByTypes, filterByText } from '../utils/filters';
import getIncidentTypes from '../utils/getIncidentTypes';

export const incidentsSelector = state => state.incidents || [];

export const availableIncidentTypesSelector = createSelector(
  [incidentsSelector],
  (incidents = []) => getIncidentTypes(incidents)
);

export const filteredIncidentsSelector = createSelector(
  [
    incidentsSelector,
    state => state.incidentFilter.types,
    state => state.incidentFilter.text,
    // state => state.incidentFilter.date,
  ],
  (incidents, filterTypes, filterText, filterDate) => {
    return (
      incidents
        // .filter(incident => filterByDate(incident, filterDate)) // too slow, maybe pre-parse dates into a comparable number?
        .filter(incident => filterByTypes(incident, filterTypes))
        .filter(incident => filterByText(incident, filterText))
    );
  }
);

// export const recentIncidentsSelector = createSelector([filteredIncidentsSelector], incidents => {
//   return incidents.slice(0, 5);
// });
