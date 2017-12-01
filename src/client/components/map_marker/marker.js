import React, { PureComponent } from 'react';

import { genericBooleanType, genericHandlerType, eventType } from '../../types';

import './map-marker.css';

import style from './marker.styles';

class MapMarker extends PureComponent {
  onHover = () => {
    this.props.onEventHover(this.props.alert.id);
  };

  render() {
    const { alert, isActive = false } = this.props;

    return (
      <div
        className={'event-marker ' + (isActive ? 'active' : '')}
        onMouseOver={this.onHover}
        style={style(alert, isActive)}
      />
    );
  }

  static propTypes = {
    isActive: genericBooleanType.isRequired,
    alert: eventType.isRequired,
    onEventHover: genericHandlerType,
  };
}

export default MapMarker;
