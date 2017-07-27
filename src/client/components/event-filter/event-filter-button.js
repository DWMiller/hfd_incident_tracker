import React from 'react';
import PropTypes from 'prop-types';

const EventFilterButton = ({ onSelect, isSelected, icon }) => {
  return (
    <div
      onClick={() => {
        onSelect(icon);
      }}
      className={'event-filter-panel-type ' + (isSelected ? 'selected' : '')}
    >
      <img alt={'Filter' + icon} src={'img/' + icon} />
    </div>
  );
};

EventFilterButton.propTypes = {
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  icon: PropTypes.string.isRequired,
};

export default EventFilterButton;
