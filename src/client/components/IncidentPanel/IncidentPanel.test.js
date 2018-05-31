import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; //ES6 modules

import { initialState } from './../../config';

import IncidentPanel from './IncidentPanel';

const mockStore = configureStore([]);
const store = mockStore(initialState);

const fauxIncident = {
  category: 'MEDICAL',
  location: {
    address: '123 Fake Street',
    coordinates: [-79.8997007, 43.2301751],
  },
  locationName: 'Fake Spot',
  id: '123',
  _id: '123',
};

it('incident panel renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <Provider store={store}>
      <IncidentPanel isVisible={true} incidents={[fauxIncident]} onIncidentSelect={() => {}} />
    </Provider>,
    div
  );
});
