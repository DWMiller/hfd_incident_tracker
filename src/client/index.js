import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import App from './components/app';
import './index.css';
// import Perf from 'react-addons-perf';

import store from './reducers/store';

const addEvent = event => store.dispatch({ type: 'ADD_EVENT', event });
const addEvents = events => store.dispatch({ type: 'ADD_EVENTS', events });

function render() {
  const props = {
    state: store.getState(),
  };

  // Perf.start();
  ReactDOM.render(<App {...props} />, document.getElementById('root'));
  // Perf.stop();
  // const measurements = Perf.getLastMeasurements();
  // Perf.printWasted(measurements);
}

store.subscribe(() => {
  render();
  localStorage.setItem('redux', JSON.stringify(store.getState()));
});

const socket = window.location.port ? io('//localhost:3001') : io();
socket.on('event', addEvent);

const fetchRecentIncidents = async () => {
  const response = await fetch('//localhost:3001/recent');
  return await response.json();
};

fetchRecentIncidents().then(events => {
  store.dispatch({ type: 'CLEAR_EVENTS' }); // clears local storage duplicates
  addEvents(events);
});
