import React from 'react';
import { render } from 'react-dom';

import MapContainer from './MapContainer';
import Map from './Map';
import MapMarker from './MapMarker';

import { initialState, googleMapURL } from './../../config';

const fauxEvent = {
  category: 'MEDICAL',
  location: {
    address: '123 Fake Street',
    coordinates: [-79.8997007, 43.2301751],
  },
  locationName: 'Fake Spot',
  id: '123',
  _id: '123',
};

it('map container renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <MapContainer
      mapChange={() => {}}
      active="123"
      settings={initialState.map}
      alerts={[fauxEvent]}
    />,
    div
  );
});

it('map renders renders without crashing', () => {
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
      alerts={[fauxEvent]}
      active="123"
    />,
    div
  );
});

it.skip('map marker renders without crashing', () => {
  const div = document.createElement('div');

  const [lng, lat] = fauxEvent.location.coordinates;

  render(
    <MapMarker key={fauxEvent._id} isActive={false} alert={fauxEvent} lat={lat} lng={lng} />,
    div
  );
});
