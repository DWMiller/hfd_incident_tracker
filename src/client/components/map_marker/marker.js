import React, { PureComponent } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';

import { genericBooleanType, genericHandlerType, eventType } from '../../types';
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
    url: `img/${icon.file}`,
  };
}

class MapMarker extends PureComponent {
  static propTypes = {
    isActive: genericBooleanType.isRequired,
    alert: eventType.isRequired,
    onEventHover: genericHandlerType.isRequired,
    onEventClick: genericHandlerType.isRequired,
  };

  state = {
    isOpen: false,
  };

  onHover = () => {
    this.props.onEventHover(this.props.alert.id);
  };

  onClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
    // this.props.onEventClick(this.props.alert);
  };

  render() {
    return (
      <Marker
        position={{ lat: this.props.lat, lng: this.props.lng }}
        icon={getIconPath(this.props.alert)}
        onClick={this.onClick}
        onMouseOver={this.onHover}
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
