import subHours from 'date-fns/subHours';

import { createSelector } from 'reselect';

import { filterByTypes, filterByText, filterByDate } from '../utils/filters';
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
    state => state.incidentFilter.date,
  ],
  (incidents, filterTypes, filterText, filterDate) => {
    const skipDateFilter = filterDate.min === 0 && filterDate.max === 24;

    const dates = skipDateFilter
      ? null
      : {
          min: subHours(
            new Date(),
            typeof filterDate.min !== 'undefined' ? 24 - filterDate.min : 0
          ),
          max: subHours(
            new Date(),
            typeof filterDate.max !== 'undefined' ? 24 - filterDate.max : 24
          ),
        };

    return incidents.filter(incident => {
      if (!skipDateFilter && !filterByDate(incident, dates)) {
        return false;
      }

      if (!filterByText(incident, filterText)) {
        return false;
      }

      if (!filterByTypes(incident, filterTypes)) {
        return false;
      }

      return true;
    });
  }
);

// export const recentIncidentsSelector = createSelector([filteredIncidentsSelector], incidents => {
//   return incidents.slice(0, 5);
// });
