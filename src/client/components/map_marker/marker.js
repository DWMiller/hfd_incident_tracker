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
    onEventHover: genericHandlerType,
  };

  onHover = () => {
    this.props.onEventHover(this.props.alert.id);
  };

  render() {
    // return (
    //   <div
    //     className={'event-marker ' + (isActive ? 'active' : '')}
    //     onMouseOver={this.onHover}
    //   />
    // );

    return (
      <Marker
        position={{ lat: this.props.lat, lng: this.props.lng }}
        icon={getIconPath(this.props.alert)}
      >
        {this.props.isActive && <InfoWindow />}
      </Marker>
    );
  }
}

export default MapMarker;
