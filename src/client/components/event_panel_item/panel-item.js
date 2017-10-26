import React from 'react';
import { genericHandlerType, eventType } from '../../types';

import { eventDefinitions } from '../../config/event-definitions';

import './event-panel-item.css';

const moment = require('moment');

const Event = props => {
  const date = moment(props.event.created).format('MMMM Do h:mm a');

  const type = eventDefinitions[props.event.category]
    ? eventDefinitions[props.event.category]
    : eventDefinitions['UNKNOWN'];

  const icon = type.icon;

  const onEventHover = () => props.onEventHover(props.event.id);
  const onEventSelect = () => props.onEventSelect(props.event);
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
        alt={type.text}
      />
      {props.event.locationName && (
        <span
          className="location"
          dangerouslySetInnerHTML={{ __html: props.event.locationName }}
        />
      )}
      <span className="category">{type.text}</span>

      <span className="address">{props.event.location.address}</span>

      <span className="link">
        <a
          onClick={twitterLinkClick}
          href={'https://twitter.com/HFD_Incidents/status/' + props.event.id}
        >
          View on Twitter
        </a>
      </span>

      <span className="time">{date}</span>
    </div>
  );
};

Event.propTypes = {
  onEventHover: genericHandlerType,
  onEventSelect: genericHandlerType,
  event: eventType,
};

export default Event;
