import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Marker } from 'react-google-maps';

import { MapInfoWindow } from './InfoWindow';

import { incidentType } from 'client/types';

class MapMarker extends PureComponent {
  onClick = () => this.props.setActiveMarker(this.props.isActive ? null : this.props.incident.id);

  render() {
    const { height, width, file: url } = this.props.incident.icon;

    const markerIcon = {
      scaledSize: { height, width },
      url,
    };

    return (
      <Marker position={this.props.position} defaultIcon={markerIcon} onClick={this.onClick}>
        {this.props.isActive && (
          <MapInfoWindow onCloseClick={this.onClick} incident={this.props.incident} />
        )}
      </Marker>
    );
  }
}

MapMarker.propTypes = {
  isActive: PropTypes.bool.isRequired,
  incident: incidentType.isRequired,
};

export default MapMarker;
