import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import io from 'socket.io-client';
import App from './components/app';
import './index.css';
// import Perf from 'react-addons-perf';

import store from './store';

import { addEvent, addEvents, clearEvents } from './actions/actionCreators';

const Root = (
  <Provider store={store}>
    <App />
  </Provider>
);

// Perf.start();
render(Root, document.getElementById('root'));
// Perf.stop();
// const measurements = Perf.getLastMeasurements();
// Perf.printWasted(measurements);

store.subscribe(() => {
  localStorage.setItem('redux', JSON.stringify(store.getState()));
});

const socket = window.location.port ? io('//localhost:3001') : io();
socket.on('event', event => store.dispatch(addEvent(event)));

const fetchRecentIncidents = async () => {
  const path = window.location.port ? '//localhost:3001' : '';
  const response = await fetch(`${path}/recent`);
  return await response.json();
};

fetchRecentIncidents().then(events => {
  store.dispatch(clearEvents()); // clears local storage duplicates
  store.dispatch(addEvents(events));
});
