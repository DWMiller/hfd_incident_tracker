import { incidentDefinitions } from 'client/config/incident-definitions';

export const filterByTypes = (incident, types) => {
  const type = incidentDefinitions[incident.category]
    ? incidentDefinitions[incident.category]
    : incidentDefinitions['UNKNOWN'];

  return types.some(icon => icon === type.icon);
};

export const filterByText = (incident, text) =>
  `${incident.location.address} ${incident.location.address} ${
    incident.code
  } ${incident.locationName || ''} ${incident.category}`
    .toUpperCase()
    .includes(text.toUpperCase());

export const filterByDate = (incident, date) => {
  return incident.time.substring(0, 10) === date;
};
