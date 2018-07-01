import React, { Component } from 'react';
import { Marker } from 'react-google-maps';

import Map from 'client/components/Map';

export class ScreenIncidentMap extends Component {
  render() {
    console.log(this.props);

    const [lng, lat] = this.props.incident.location.coordinates;

    return (
      <Map
        lat={lat}
        lng={lng}
        zoom={12}
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
      </Map>
    );
  }
}

export default ScreenIncidentMap;
