import { createSelector } from 'reselect';
import { incidentDefinitions } from 'client/config/incident-definitions';

export const incidentTypeFilterSelector = state => state.filters.types;
export const incidentTextFilterSelector = state => state.filters.text;

export const incidentsSelector = state => state.incidents || [];

const filterByTypes = (incident, types) => {
  const type = incidentDefinitions[incident.category]
    ? incidentDefinitions[incident.category]
    : incidentDefinitions['UNKNOWN'];

  return types.some(icon => icon === type.icon);
};

const filterByText = (incident, text) =>
  `${incident.location.address} ${incident.location.address} ${
    incident.code
  } ${incident.locationName || ''} ${incident.category}`
    .toUpperCase()
    .includes(text.toUpperCase());

export const availableIncidentTypesSelector = createSelector(
  [incidentsSelector],
  (incidents = []) => {
    return Object.keys(
      incidents.reduce((accumulator, incident) => {
        const type = incidentDefinitions[incident.category]
          ? incidentDefinitions[incident.category]
          : incidentDefinitions.UNKNOWN;
        return Object.assign({}, accumulator, { [type.icon]: true });
      }, {})
    );
  }
);

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
