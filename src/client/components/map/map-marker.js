import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Marker, InfoWindow } from 'react-google-maps';

import { eventType } from '../../types';
import { eventDefinitions } from '../../config/event-definitions';

import './map-marker.css';

function getIconPath(alert) {
  let eventType = eventDefinitions[alert.category];

  if (typeof eventType === 'undefined') {
    eventType = eventDefinitions.UNKNOWN;
  }

  const icon = eventType.icon;

  return {
    scaledSize: { height: icon.height, width: icon.width },
    url: icon.file,
  };
}

class MapMarker extends PureComponent {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    alert: eventType.isRequired,
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
