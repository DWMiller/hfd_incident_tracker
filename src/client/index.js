import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store, { history } from './redux/store';

import App from './components/App';

import registerServiceWorker from './registerServiceWorker';

import './styles.js';

// import Perf from 'react-addons-perf';

const Root = (
  <Provider store={store}>
    <App history={history} />
  </Provider>
);

// Perf.start();
render(Root, document.getElementById('root'));
registerServiceWorker();

// Perf.stop();
// const measurements = Perf.getLastMeasurements();
// Perf.printWasted(measurements);

store.subscribe(() => {
  const state = { ...store.getState() };
  delete state.router;
  localStorage.setItem('hfd-state', JSON.stringify(state));
});
