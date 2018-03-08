import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { eventType } from '../../types';

import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';

import MapMarker from '../map_marker/marker';

import './map.css';

const apiKey = 'AIzaSyBDX9TpI_4wnD1Q-JVmLjfhc9B-vPgwc0Y';
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`;

const renderMarkers = (active, alerts, onEventClick, onEventHover) => {
  return alerts.map(alert => {
    const isActive = false; // alert.id === active;

    const [lng, lat] = alert.location.coordinates;

    return (
      <MapMarker
        key={alert._id}
        isActive={isActive}
        alert={alert}
        lat={lat}
        lng={lng}
        onEventClick={onEventClick}
        onEventHover={onEventHover}
      />
    );
  });
};

const MyMapComponent = withScriptjs(
  withGoogleMap(props => {
    const Markers = renderMarkers(
      props.active,
      props.alerts,
      props.onEventClick,
      props.setActiveEvent
    );

    return (
      <GoogleMap
        center={props.settings.center}
        zoom={props.settings.zoom}
        onCenterChanged={props.onMapPropsChange}
        ref={props.mapRef}
      >
        <MarkerClusterer minimumClusterSize={3} maxZoom={13} gridSize={30}>
          {Markers}
        </MarkerClusterer>
      </GoogleMap>
    );
  })
);

class Map extends Component {
  static propTypes = {
    mapChange: PropTypes.func.isRequired,
    setActiveEvent: PropTypes.func.isRequired,
    alerts: PropTypes.arrayOf(eventType),
    onEventClick: PropTypes.func.isRequired,
  };

  mapRef = React.createRef(); //passe to MyMapComponent component to be bound to GoogleMap component
  timeout = null;

  // onEventHover = eventId => {
  //   this.props.setActiveEvent(eventId);
  // };

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
        <MyMapComponent
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

export default Map;
