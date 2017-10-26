import React from 'react';
import PropTypes from 'prop-types';

import eventTypes from '../../config/event-types';

import './event-panel-item.css';

const moment = require('moment');

const Event = props => {
  const date = moment(props.created).format('MMMM Do h:mm a');

  const eventType = eventTypes[props.category]
    ? eventTypes[props.category]
    : eventTypes['UNKNOWN'];

  const icon = eventType.icon;

  const onEventHover = () => props.onEventHover(props.id);
  const onEventSelect = () => props.onEventSelect(props);
  const twitterLinkClick = e => e.stopPropagation();

  return (
    <div
      onMouseOver={onEventHover}
      onClick={onEventSelect}
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
        {props.location.address}
      </span>

      <span className="link">
        <a
          onClick={twitterLinkClick}
          href={'https://twitter.com/HFD_Incidents/status/' + props.id}
        >
          View on Twitter
        </a>
      </span>

      <span className="time">
        {date}
      </span>
    </div>
  );
};

Event.propTypes = {
  onEventHover: PropTypes.func.isRequired,
  onEventSelect: PropTypes.func.isRequired,
  location: PropTypes.shape({
    address: PropTypes.string.isRequired,
  }),
};

export default Event;
