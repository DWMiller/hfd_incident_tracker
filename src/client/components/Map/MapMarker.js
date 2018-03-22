import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Marker, InfoWindow } from 'react-google-maps';

import { incidentType } from '../../types';
import { incidentDefinitions } from '../../config/incident-definitions';

import icons from '../../config/icons';

import './MapMarker.css';

function getIconPath(alert) {
  let incidentType = incidentDefinitions[alert.category];

  if (typeof incidentType === 'undefined') {
    incidentType = incidentDefinitions.UNKNOWN;
  }

  const icon = icons[incidentType.icon];

  return {
    scaledSize: { height: icon.height, width: icon.width },
    url: icon.file,
  };
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
    return (
      <Marker
        position={{ lat: this.props.lat, lng: this.props.lng }}
        defaultIcon={getIconPath(this.props.alert)}
        onClick={this.onClick}
      >
        {0 &&
          this.state.isOpen && (
            <InfoWindow>
              <p>Test</p>
            </InfoWindow>
          )}
      </Marker>
    );
  }
}

export default MapMarker;
