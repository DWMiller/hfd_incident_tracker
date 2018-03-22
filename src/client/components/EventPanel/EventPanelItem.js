import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { eventType } from '../../types';

import { eventDefinitions } from '../../config/event-definitions';

import icons from '../../config/icons';

import './EventPanelItem.css';

const moment = require('moment');

class Event extends PureComponent {
  onEventHover = () => this.props.onEventHover(this.props.event.id);
  onEventSelect = () => this.props.onEventSelect(this.props.event);
  twitterLinkClick = e => e.stopPropagation();

  render() {
    const date = moment(this.props.event.created).format('MMMM Do h:mm a');

    const type = eventDefinitions[this.props.event.category]
      ? eventDefinitions[this.props.event.category]
      : eventDefinitions['UNKNOWN'];

    const { isActive, event } = this.props;

    const icon = icons[type.icon];

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
          src={icon.file}
          alt={type.text}
        />
        {event.locationName && (
          <span className="location" dangerouslySetInnerHTML={{ __html: event.locationName }} />
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
    onEventHover: PropTypes.func.isRequired,
    onEventSelect: PropTypes.func.isRequired,
    event: eventType,
  };
}

export default Event;
