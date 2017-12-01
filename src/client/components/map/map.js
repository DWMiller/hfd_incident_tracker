import React, { PureComponent } from 'react';

import { eventListType, genericHandlerType } from '../../types';

import GoogleMap from 'google-map-react';
import MapMarker from '../map_marker/marker';

import './map.css';

const apiKey = 'AIzaSyBDX9TpI_4wnD1Q-JVmLjfhc9B-vPgwc0Y';
const defaultCenter = { lat: 43.254401, lng: -79.863552 };

class Map extends PureComponent {
  onEventHover = eventId => {
    this.props.setActiveEvent(eventId);
  };

  onMapPropsChange = settings => {
    this.props.mapChange(settings);
  };

  generateMarkers(active, alerts) {
    return alerts.map(alert => {
      const isActive = alert.id === active;

      const [lng, lat] = alert.location.coordinates;

      return (
        <MapMarker
          onEventHover={this.onEventHover}
          key={alert._id}
          isActive={isActive}
          alert={alert}
          lat={lat}
          lng={lng}
        />
      );
    });
  }

  render() {
    const Markers = this.generateMarkers(this.props.active, this.props.alerts);
    const { zoom, center } = this.props.settings;

    return (
      <div className="map-container" width>
        <GoogleMap
          onChange={this.onMapPropsChange}
          defaultCenter={defaultCenter}
          center={center}
          defaultZoom={10}
          zoom={zoom}
          bootstrapURLKeys={{ key: apiKey }}
        >
          {Markers}
        </GoogleMap>
      </div>
    );
  }
}

Map.propTypes = {
  mapChange: genericHandlerType,
  setActiveEvent: genericHandlerType,
  alerts: eventListType,
};

export default Map;
