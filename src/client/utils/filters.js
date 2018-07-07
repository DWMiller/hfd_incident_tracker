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
  //TODO - Just added time field, remove this check once db has caught up
  const dateField = incident.time || incident.created;
  return dateField.substring(0, 10) === date;
};
