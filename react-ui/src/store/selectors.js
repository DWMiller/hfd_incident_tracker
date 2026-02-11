import { createSelector } from '@reduxjs/toolkit';

import { filterByTypes, filterByText, filterByDate } from '../utils/filters';
import getIncidentTypes from '../utils/getIncidentTypes';
import { incidentDefinitions } from '../config/incident-definitions';

export const incidentsSelector = state => state.incidents || [];

export const mappableIncidentsSelector = createSelector(
  [incidentsSelector],
  incidents => incidents.filter(i => i.mappable)
);

export const availableIncidentTypesSelector = createSelector(
  [mappableIncidentsSelector],
  (incidents = []) => getIncidentTypes(incidents)
);

const HOUR_MS = 3600000;
const MAX_HOURS = 168; // 7 days

const dateFilteredIncidentsSelector = createSelector(
  [mappableIncidentsSelector, state => state.incidentFilter.date],
  (incidents, filterDate) => {
    if (filterDate.min === 0 && filterDate.max === MAX_HOURS) return incidents;
    const min = new Date(Date.now() - filterDate.max * HOUR_MS);
    const max = new Date(Date.now() - filterDate.min * HOUR_MS);
    return incidents.filter(i => filterByDate(i, { min, max }));
  }
);

export const incidentCountsByTypeSelector = createSelector(
  [dateFilteredIncidentsSelector],
  (incidents = []) =>
    incidents.reduce((counts, incident) => {
      const def = incidentDefinitions[incident.category] || incidentDefinitions.UNKNOWN;
      const key = def.icon;
      counts[key] = (counts[key] || 0) + 1;
      return counts;
    }, {})
);

export const filteredIncidentsSelector = createSelector(
  [
    mappableIncidentsSelector,
    state => state.incidentFilter.types,
    state => state.incidentFilter.text,
    state => state.incidentFilter.date,
  ],
  (incidents, filterTypes, filterText, filterDate) => {
    const skipDateFilter = filterDate.min === 0 && filterDate.max === MAX_HOURS;

    const dates = skipDateFilter
      ? null
      : {
          min: new Date(Date.now() - filterDate.max * HOUR_MS),
          max: new Date(Date.now() - filterDate.min * HOUR_MS),
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
