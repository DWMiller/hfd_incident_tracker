import { incidentDefinitions } from 'client/config/incident-definitions';
import icons from 'client/config/icons';

export default function getIcon(incident) {
  let incidentType = incidentDefinitions[incident.category];

  if (typeof incidentType === 'undefined') {
    incidentType = incidentDefinitions.UNKNOWN;
  }

  const icon = icons[incidentType.icon];

  return icon;
}
