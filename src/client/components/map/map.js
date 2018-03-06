import React, { PureComponent } from 'react';

import { eventListType, genericHandlerType } from '../../types';

import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

import MapMarker from '../map_marker/marker';

import './map.css';

const apiKey = 'AIzaSyBDX9TpI_4wnD1Q-JVmLjfhc9B-vPgwc0Y';
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`;

const defaultCenter = { lat: 43.254401, lng: -79.863552 };

class Map extends PureComponent {
  static propTypes = {
    mapChange: genericHandlerType,
    setActiveEvent: genericHandlerType,
    alerts: eventListType,
  };

  mapRef = React.createRef();

  // onEventHover = eventId => {
  //   this.props.setActiveEvent(eventId);
  // };

  onMapPropsChange = settings => {
    console.log(settings);
    // this.props.mapChange(settings);
  };

  generateMarkers(active, alerts) {
    return alerts.map(alert => {
      const isActive = false; // alert.id === active;

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

    // onChange={this.onMapPropsChange}

    const { zoom, center } = this.props.settings;

    const Map = withScriptjs(
      withGoogleMap(() => {
        return (
          <GoogleMap
            defaultCenter={defaultCenter}
            center={center}
            defaultZoom={10}
            zoom={zoom}
            bootstrapURLKeys={{ key: apiKey }}
            onCenterChanged={this.onMapPropsChange}
          >
            {Markers}
          </GoogleMap>
        );
      })
    );

    return (
      <div className="map-container">
        <Map
          googleMapURL={googleMapURL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Map;
