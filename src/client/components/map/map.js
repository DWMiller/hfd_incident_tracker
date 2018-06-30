import React, { Component } from 'react';

import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';

import MapMarker from './MapMarker';

//

class Map extends Component {
  renderMarkers = (active, incidents) => {
    return incidents.map(incident => {
      const isActive = this.props.activeMarker === incident.id;
      const [lng, lat] = incident.location.coordinates;

      return (
        <MapMarker
          key={incident.id}
          isActive={isActive}
          incident={incident}
          lat={lat}
          lng={lng}
          setActiveMarker={this.props.setActiveMarker}
        />
      );
    });
  };

  render() {
    const Markers = this.renderMarkers(this.props.active, this.props.incidents);

    return (
      <GoogleMap
        center={this.props.settings.center}
        zoom={this.props.settings.zoom}
        onCenterChanged={this.props.onMapPropsChange}
        ref={this.props.mapRef}
      >
        <MarkerClusterer minimumClusterSize={3} maxZoom={12} gridSize={50}>
          {Markers}
        </MarkerClusterer>
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(Map));
