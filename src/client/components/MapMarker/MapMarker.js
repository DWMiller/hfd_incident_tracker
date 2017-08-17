import React from 'react';
import PropTypes from 'prop-types';

import './map-marker.css';

import style from './MapMarker.styles';

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
  isActive: PropTypes.bool,
  alert: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }),
};

export default MapMarker;
