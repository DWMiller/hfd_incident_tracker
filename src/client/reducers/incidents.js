import { createSelector } from 'reselect';
import { incidentDefinitions } from '../config/incident-definitions';

export default (state = [], { type, incident, incidents } = {}) => {
  switch (type) {
    case 'ADD_INCIDENT':
      return [...state, incident];
    case 'ADD_INCIDENTS':
      return [...state, ...incidents];
    case 'CLEAR_INCIDENTS':
      return [];
    default:
      return state;
  }
};

export const incidentTypeFilterSelector = state => state.filters.types;
export const incidentTextFilterSelector = state => state.filters.text;

export const incidentsSelector = state => state.incidents;

const filterByTypes = (incident, types) => {
  const type = incidentDefinitions[incident.category]
    ? incidentDefinitions[incident.category]
    : incidentDefinitions['UNKNOWN'];

  return types.some(icon => icon === type.icon);
};

const filterByText = (incident, text) => {
  const normalizedFilterFields = (
    incident.location.address +
    incident.locationName +
    incident.category
  ).toUpperCase();
  return normalizedFilterFields.includes(text.toUpperCase());
};

export const filteredIncidentsSelector = createSelector(
  [incidentsSelector, incidentTypeFilterSelector, incidentTextFilterSelector],
  (incidents, filterTypes, filterText) => {
    return incidents
      .filter(incident => filterByTypes(incident, filterTypes))
      .filter(incident => filterByText(incident, filterText));
  }
);

export const recentIncidentsSelector = createSelector([filteredIncidentsSelector], incidents => {
  return incidents.slice(0, 5);
});
