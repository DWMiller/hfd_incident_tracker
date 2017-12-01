import React, { PureComponent } from 'react';
import { genericHandlerType, eventType } from '../../types';

import { eventDefinitions } from '../../config/event-definitions';

import './event-panel-item.css';

const moment = require('moment');

class Event extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      date: moment(props.event.created).format('MMMM Do h:mm a'),
    };

    this.state.type = eventDefinitions[props.event.category]
      ? eventDefinitions[props.event.category]
      : eventDefinitions['UNKNOWN'];
  }

  onEventHover = () => this.props.onEventHover(this.props.event.id);
  onEventSelect = () => this.props.onEventSelect(this.props.event);
  twitterLinkClick = e => e.stopPropagation();

  render() {
    const { date, type } = this.state;

    const { isActive, event } = this.props;

    const icon = type.icon;

    return (
      <div
        onMouseOver={this.onEventHover}
        onClick={this.onEventSelect}
        className={'event-panel-item ' + (isActive ? 'active' : '')}
      >
        <img
          className="icon"
          width={icon.width}
          height={icon.height}
          src={`img/${icon.file}`}
          alt={type.text}
        />
        {event.locationName && (
          <span
            className="location"
            dangerouslySetInnerHTML={{ __html: event.locationName }}
          />
        )}
        <span className="category">{type.text}</span>

        <span className="address">{event.location.address}</span>

        <span className="link">
          <a
            onClick={this.twitterLinkClick}
            href={'https://twitter.com/HFD_Incidents/status/' + event.id}
          >
            View on Twitter
          </a>
        </span>

        <span className="time">{date}</span>
      </div>
    );
  }

  static propTypes = {
    onEventHover: genericHandlerType,
    onEventSelect: genericHandlerType,
    event: eventType,
  };
}

export default Event;
