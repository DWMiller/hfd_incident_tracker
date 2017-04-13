import React, { Component } from "react";

import style from "./event-marker.styles";

const Marker = ({ alert, isActive = false, onEventHover }) => (
  <div
    className="event-marker"
    onMouseOver={() => onEventHover(alert.id)}
    style={style(alert, isActive)}
  />
);

Marker.propTypes = {
  alert: React.PropTypes.shape({
    category: React.PropTypes.string.isRequired
  })
};

module.exports = Marker;
