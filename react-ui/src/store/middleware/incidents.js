import { addIncidents } from '../modules/incidents';

/**
 * Middlewares
 */

const INCIDENT_RECEIVED = '[socket] INCIDENT_RECEIVED';

export const subscribeIncidents = () => {
  return {
    event: 'incident',
    handle: INCIDENT_RECEIVED,
  };
};

// New incident like a socket update
const incidentReceived = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === INCIDENT_RECEIVED) {
    dispatch(addIncidents([action.payload]));
  }
};

export const incidentsMiddleware = [incidentReceived];
