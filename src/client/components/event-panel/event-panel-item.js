import React from 'react';
import PropTypes from 'prop-types';

import eventTypes from '../../config/event-types';

import './event-panel-item.css';

const moment = require('moment');

const Event = props => {
  const date = moment(parseInt(props.time, 10));

  const eventType = eventTypes[props.category]
    ? eventTypes[props.category]
    : eventTypes['UNKNOWN'];

  const icon = eventType.icon;

  return (
    <div
      onMouseOver={() => props.onEventHover(props)}
      onClick={() => props.onEventSelect(props)}
      className={'event-panel-item ' + (props.isActive ? 'active' : '')}
    >
      <img
        className="icon"
        width={icon.width}
        height={icon.height}
        src={`img/${icon.file}`}
        alt={eventType.text}
      />
      {props.locationName &&
        <span
          className="location"
          dangerouslySetInnerHTML={{ __html: props.locationName }}
        />}
      <span className="category">
        {eventType.text}
      </span>

      <span className="address">
        {props.formatted_address}
      </span>
      <span className="time">
        {date.format('MMMM Do h:mm a')}
      </span>
    </div>
  );
};

Event.propTypes = {
  formatted_address: PropTypes.string.isRequired,
};

export default Event;
