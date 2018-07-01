import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

import { googleMapURL } from './../../config';

export class ScreenIncidentMap extends Component {
  render() {
    const [lng, lat] = this.props.incident.location.coordinates;

    return (
      <GoogleMap
        defaultCenter={{ lat, lng }}
        zoom={12}
        width="240px"
        height="240px"
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          zoomControl: false,
          fullscreenControl: false,
          disableDoubleClickZoom: true,
          draggable: false,
          scrollwheel: false,
          panControl: false,
        }}
      >
        <Marker position={{ lat, lng }} />
      </GoogleMap>
    );
  }
}

export default compose(
  withProps(({ width, height }) => ({
    googleMapURL,
    loadingElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ width, height }} />,
  })),
  withScriptjs,
  withGoogleMap
)(ScreenIncidentMap);
