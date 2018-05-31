import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; //ES6 modules

import MapContainer from './MapContainer';
import Map from './Map';
import MapMarker from './MapMarker';

import { initialState, googleMapURL } from './../../config';

const mockStore = configureStore([]);

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

it('renders', () => {
  const store = mockStore(initialState);

  const div = document.createElement('div');
  render(
    <Provider store={store}>
      <MapContainer
        mapChange={() => {}}
        active="123"
        settings={initialState.map}
        alerts={[fauxIncident]}
      />
    </Provider>,

    div
  );
});

it('renders', () => {
  const div = document.createElement('div');

  let ref = React.createRef();

  render(
    <Map
      googleMapURL={googleMapURL}
      loadingElement={<div />}
      containerElement={<div />}
      mapElement={<div />}
      onMapPropsChange={() => {}}
      mapRef={ref}
      settings={initialState.map}
      onCenterChanged={() => {}}
      alerts={[fauxIncident]}
      active="123"
    />,
    div
  );
});

it.skip('renders', () => {
  const div = document.createElement('div');

  const [lng, lat] = fauxIncident.location.coordinates;

  render(
    <MapMarker key={fauxIncident._id} isActive={false} alert={fauxIncident} lat={lat} lng={lng} />,
    div
  );
});
