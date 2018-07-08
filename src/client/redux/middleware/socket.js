import io from 'socket.io-client';

export const SOCKET_CONNECT = '[socket] CONNECT';
export const INCIDENT_RECEIVED = '[socket] INCIDENT_RECEIVED';
// export const PROCESSING_INCIDENT = '[socket] PROCESS_INCIDENT';

export const connectSocket = () => ({
  type: SOCKET_CONNECT,
});

export const incidentReceived = incident => ({
  type: INCIDENT_RECEIVED,
  incident,
});

const socket = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === SOCKET_CONNECT) {
    const socket = window.location.port ? io('//localhost:3001') : io();

    socket.on('incident', incident => {
      if (incident) {
        dispatch(incidentReceived(incident));
      }
    });
  }
};

export const socketMiddleware = [socket];
