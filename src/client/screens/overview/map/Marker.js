import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Marker } from 'react-google-maps';

import { MapInfoWindow } from './InfoWindow';

import { incidentType } from 'client/types';

import getIcon from 'client/utils/getIcon';

class MapMarker extends PureComponent {
  onClick = () => this.props.setActiveMarker(this.props.isActive ? null : this.props.incident.id);

  render() {
    const incident = this.props.incident;

    const icon = getIcon(incident);

    const markerIcon = {
      scaledSize: { height: icon.height, width: icon.width },
      url: icon.file,
    };

    return (
      <Marker
        position={{ lat: this.props.lat, lng: this.props.lng }}
        defaultIcon={markerIcon}
        onClick={this.onClick}
      >
        {this.props.isActive && (
          <MapInfoWindow onCloseClick={this.onClick} icon={icon} incident={incident} />
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
