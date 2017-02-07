import React from 'react';
import io from 'socket.io-client';
import ReactDOM from 'react-dom';
import createApp from './components/app';
import './index.css';

import store from './reducers/store';

const addEvent = event => store.dispatch({ type: 'ADD_EVENT', event });
const addEvents = events => store.dispatch({ type: 'ADD_EVENTS', events });

const App = createApp(React);

const state = { events: [] };

function render() {
  ReactDOM.render(
    <App alerts={state.events} />,
    document.getElementById('root')
  );
}

store.subscribe(() => {
  state.events = store.getState().events;
  console.log(state);
  render();
});

const socket = location.port ? io('//localhost:3001') : io();

socket.on('connected', () => {
  socket.emit('all_events');
});

socket.on('events', addEvents);

socket.on('event', addEvent);

render();
