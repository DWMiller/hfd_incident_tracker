import { createSelector } from 'reselect';

import { filterByTypes, filterByText, filterByDate } from 'client/utils/filters';
import getIncidentTypes from 'client/utils/getIncidentTypes';

export const incidentTypeFilterSelector = state => state.filters.types;
export const incidentTextFilterSelector = state => state.filters.text;
export const incidentDateFilterSelector = state => state.filters.date;

export const incidentsSelector = state => state.incidents || [];

export const availableIncidentTypesSelector = createSelector(
  [incidentsSelector],
  (incidents = []) => getIncidentTypes(incidents)
);

export const filteredIncidentsSelector = createSelector(
  [
    incidentsSelector,
    incidentTypeFilterSelector,
    incidentTextFilterSelector,
    incidentDateFilterSelector,
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
