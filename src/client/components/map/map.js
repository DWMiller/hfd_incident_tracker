import React, { Component } from "react";

import GoogleMap from "google-map-react";
import Marker from "./event-marker";

import store from "../../reducers/store";
import "./map.css";

const apiKey = "AIzaSyBDX9TpI_4wnD1Q-JVmLjfhc9B-vPgwc0Y";
const defaultCenter = { lat: 43.254401, lng: -79.863552 };

class Map extends Component {
  onEventHover(eventId) {
    store.dispatch({ type: "SET_ACTIVE_EVENT", eventId });
  }

  onMapPropsChange(settings) {
    store.dispatch({ type: "MAP_CHANGE", settings });
  }

  generateMarkers(active, alerts) {
    return alerts.map(alert => {
      const isActive = alert.id === active;
      return (
        <Marker
          onEventHover={this.onEventHover}
          key={alert.id}
          isActive={isActive}
          alert={alert}
          {...alert.coordinates}
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
  alerts: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      coordinates: React.PropTypes.object.isRequired,
      code: React.PropTypes.string.isRequired
    })
  )
};

module.exports = Map;
