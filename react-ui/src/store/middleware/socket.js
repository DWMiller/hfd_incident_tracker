import io from 'socket.io-client';

//http://nmajor.com/posts/using-socket-io-with-redux-websocket-redux-middleware

const socket = window.location.port ? io('//localhost:3001') : io();

export const socketMiddleware = ({ dispatch }) => next => action => {
  if (typeof action === 'function') {
    return next(action);
  }

  const { event, leave, handle, ...rest } = action;

  if (!event) {
    return next(action);
  }

  if (leave) {
    socket.removeListener(event);
  }

  let handleEvent = handle;
  if (typeof handleEvent === 'string') {
    handleEvent = payload => dispatch({ type: handle, payload, ...rest });
  }
  return socket.on(event, handleEvent);
};
