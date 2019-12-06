import io from 'socket.io-client';

// export const PROCESSING_INCIDENT = '[socket] PROCESS_INCIDENT';

//http://nmajor.com/posts/using-socket-io-with-redux-websocket-redux-middleware
export const socketMiddleware = () => {
  const socket = window.location.port ? io('//localhost:3001') : io();

  return ({ dispatch }) => next => (action) => {
    if (typeof action === 'function') {
      return next(action);
    }

    const {
      event,
      leave,
      handle,
      ...rest
    } = action;

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
}