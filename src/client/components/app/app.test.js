import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store'; //ES6 modules

import { initialState } from './../../config';

import App from './app';

const mockStore = configureStore([]);

it('renders without crashing', () => {
  const store = mockStore(initialState);

  const div = document.createElement('div');
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
});
