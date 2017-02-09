import React from 'react';
import io from 'socket.io-client';
import ReactDOM from 'react-dom';
import createApp from './components/app';
import './index.css';

import store from './reducers/store';

const addEvent = event => store.dispatch({ type: 'ADD_EVENT', event });
const addEvents = events => store.dispatch({ type: 'ADD_EVENTS', events });

const App = createApp(React);

function render() {
  const props = {
    state: store.getState()
  };

  ReactDOM.render(<App {...props} />, document.getElementById('root'));
}

store.subscribe(() => {
  render();
  localStorage.setItem('redux', JSON.stringify(store.getState()));
});

const socket = location.port ? io('//localhost:3001') : io();

socket.on('connected', () => {
  socket.emit('all_events');
});

socket.on('events', events => {
  store.dispatch({ type: 'CLEAR_EVENTS', events });
  addEvents(events);
});

socket.on('event', addEvent);
