import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Marker } from 'react-google-maps';

import { MapInfoWindow } from './MapInfoWindow';

import { incidentType } from '../../types';
import { incidentDefinitions } from '../../config/incident-definitions';

import icons from '../../config/icons';

import './MapMarker.css';

function getIcon(alert) {
  let incidentType = incidentDefinitions[alert.category];

  if (typeof incidentType === 'undefined') {
    incidentType = incidentDefinitions.UNKNOWN;
  }

  const icon = icons[incidentType.icon];

  return icon;
}

class MapMarker extends PureComponent {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    alert: incidentType.isRequired,
  };

  state = {
    isOpen: false,
  };

  onClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const incident = this.props.alert;

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
        {this.state.isOpen && <MapInfoWindow icon={icon} incident={incident} />}
      </Marker>
    );
  }
}

export default MapMarker;
