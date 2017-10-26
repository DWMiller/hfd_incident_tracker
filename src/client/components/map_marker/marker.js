import React from 'react';

import { genericBooleanType, genericHandlerType, eventType } from '../../types';

import './map-marker.css';

import style from './marker.styles';

const MapMarker = props => {
  const { alert, isActive = false, onEventHover } = props;

  const onHover = () => onEventHover(alert.id);

  return (
    <div
      className={'event-marker ' + (isActive ? 'active' : '')}
      onMouseOver={onHover}
      style={style(alert, isActive)}
    />
  );
};

MapMarker.propTypes = {
  isActive: genericBooleanType.isRequired,
  alert: eventType.isRequired,
  onEventHover: genericHandlerType,
};

export default MapMarker;
