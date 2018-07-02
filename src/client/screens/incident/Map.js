import React, { Component } from 'react';
import { Marker } from 'react-google-maps';

import Map from 'client/components/Map';

export class ScreenIncidentMap extends Component {
  render() {
    const { lat, lng } = this.props.incident.position;

    const { height, width, file: url } = this.props.incident.icon;

    const markerIcon = {
      scaledSize: { height, width },
      url,
    };

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
        <Marker defaultIcon={markerIcon} position={this.props.incident.position} />
      </Map>
    );
  }
}

export default ScreenIncidentMap;
