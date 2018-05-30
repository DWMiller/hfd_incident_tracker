import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App/App';

import registerServiceWorker from './registerServiceWorker';

import './index.css';
// import Perf from 'react-addons-perf';

import store from './redux/store';

const Root = (
  <Provider store={store}>
    <App />
  </Provider>
);

// Perf.start();
render(Root, document.getElementById('root'));
registerServiceWorker();

// Perf.stop();
// const measurements = Perf.getLastMeasurements();
// Perf.printWasted(measurements);

store.subscribe(() => {
  localStorage.setItem('hfd-state', JSON.stringify(store.getState()));
});
