import React from 'react';
import PropTypes from 'prop-types';
import './event-panel-toggle.css';

const eventPanelToggle = ({ onClick }) =>
  <button onClick={onClick} className="event-pannel-toggle">
    View Events
  </button>;

eventPanelToggle.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default eventPanelToggle;
