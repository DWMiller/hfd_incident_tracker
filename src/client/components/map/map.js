import React from 'react';

import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';

import MapMarker from './MapMarker';

const renderMarkers = (active, alerts) => {
  return alerts.map(alert => {
    const isActive = false; // alert.id === active;

    const [lng, lat] = alert.location.coordinates;

    return <MapMarker key={alert._id} isActive={isActive} alert={alert} lat={lat} lng={lng} />;
  });
};

const Map = withScriptjs(
  withGoogleMap(props => {
    const Markers = renderMarkers(props.active, props.alerts);

    return (
      <GoogleMap
        center={props.settings.center}
        zoom={props.settings.zoom}
        onCenterChanged={props.onMapPropsChange}
        ref={props.mapRef}
      >
        <MarkerClusterer minimumClusterSize={3} maxZoom={12} gridSize={50}>
          {Markers}
        </MarkerClusterer>
      </GoogleMap>
    );
  })
);

export default Map;
