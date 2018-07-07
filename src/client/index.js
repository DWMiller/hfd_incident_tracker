import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store, { history } from './redux/store';

import App from './components/App';

import registerServiceWorker from './registerServiceWorker';

import './styles.js';

if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React);
}

const Root = (
  <Provider store={store}>
    <App history={history} />
  </Provider>
);

render(Root, document.getElementById('root'));

if (process.env.NODE_ENV === 'production') {
  registerServiceWorker();
}

store.subscribe(() => {
  const state = { ...store.getState() };
  delete state.router;
  delete state.filters.date;
  localStorage.setItem('hfd-state', JSON.stringify(state));
});
