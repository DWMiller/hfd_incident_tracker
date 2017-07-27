import React from 'react';
import PropTypes from 'prop-types';

import style from './event-marker.styles';

const Marker = ({ alert, isActive = false, onEventHover }) =>
  <div
    className="event-marker"
    onMouseOver={() => onEventHover(alert.id)}
    style={style(alert, isActive)}
  />;

Marker.propTypes = {
  alert: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }),
};

export default Marker;
