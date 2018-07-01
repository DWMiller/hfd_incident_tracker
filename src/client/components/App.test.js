import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store'; //ES6 modules
import { initialState } from 'client/config';

import ConnectedApp, { App } from './App';

const middlewares = [thunk];
const mockStore = configureStore([middlewares]);

describe('</App>', () => {
  it('renders', () => {
    const div = document.createElement('div');
    render(<App />, div);
  });

  it('renders', () => {
    const store = mockStore(initialState);

    const div = document.createElement('div');
    render(
      <Provider store={store}>
        <ConnectedApp />
      </Provider>,
      div
    );
  });
});
