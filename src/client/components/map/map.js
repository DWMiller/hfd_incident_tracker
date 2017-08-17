import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import GoogleMap from 'google-map-react';
import MapMarker from '../MapMarker/MapMarker';

import './map.css';

const apiKey = 'AIzaSyBDX9TpI_4wnD1Q-JVmLjfhc9B-vPgwc0Y';
const defaultCenter = { lat: 43.254401, lng: -79.863552 };

class Map extends Component {
  onEventHover = eventId => {
    this.props.store.dispatch({ type: 'SET_ACTIVE_EVENT', eventId });
  };

  onMapPropsChange = settings => {
    this.props.store.dispatch({ type: 'MAP_CHANGE', settings });
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

// Map.propTypes = {
//   alerts: PropTypes.arrayOf(
//     PropTypes.shape({
//       coordinates: PropTypes.object.isRequired,
//       code: PropTypes.string.isRequired,
//     })
//   ),
// };

export default Map;
