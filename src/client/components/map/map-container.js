import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { eventType } from '../../types';

import Map from './map';
import './map.css';

const apiKey = 'AIzaSyBDX9TpI_4wnD1Q-JVmLjfhc9B-vPgwc0Y';
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`;

class MapContainer extends PureComponent {
  static propTypes = {
    mapChange: PropTypes.func.isRequired,
    alerts: PropTypes.arrayOf(eventType),
  };

  mapRef = React.createRef(); //passe to MyMapComponent component to be bound to GoogleMap component
  timeout = null;

  saveMapState = () => {
    this.props.mapChange({
      center: this.mapRef.value.getCenter().toJSON(),
      zoom: this.mapRef.value.getZoom(),
    });
  };

  onMapPropsChange = () => {
    // Debounce change events
    window.clearTimeout(this.timeout);
    this.timeout = window.setTimeout(this.saveMapState, 500);
  };

  render() {
    return (
      <div className="map-container">
        <Map
          googleMapURL={googleMapURL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          onMapPropsChange={this.onMapPropsChange}
          mapRef={this.mapRef}
          {...this.props}
        />
      </div>
    );
  }
}

export default MapContainer;
