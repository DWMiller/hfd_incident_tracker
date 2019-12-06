import { incidentDefinitions } from '../config/incident-definitions';

/**
 * Takes a list of incidents, returns an array of all include incident types
 */
export const getIncidentTypes = incidents =>
  Object.keys(
    incidents.reduce((accumulator, incident) => {
      const type = incidentDefinitions[incident.category]
        ? incidentDefinitions[incident.category]
        : incidentDefinitions.UNKNOWN;
      return Object.assign({}, accumulator, { [type.icon]: true });
    }, {})
  );

export default getIncidentTypes;
