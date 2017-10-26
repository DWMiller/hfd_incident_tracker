import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EventPanelItem from '../event_panel_item/panel-item';

import './event-panel.css';

export class EventPanel extends Component {
  onEventHover = eventId => {
    if (this.props.active !== eventId) {
      this.props.setActiveEvent(eventId);
    }
  };

  renderEventList = events => {
    const sorted = events.sort((a, b) => (a.time < b.time ? 1 : -1));

    return sorted.map(event => {
      const isActive = event.id === this.props.active;

      return (
        <EventPanelItem
          onEventHover={this.onEventHover}
          onEventSelect={this.props.onEventSelect}
          isActive={isActive}
          {...event}
          key={event._id}
        />
      );
    });
  };

  render() {
    const { events, isVisible } = this.props;

    return (
      <div className={'event-panel ' + (isVisible ? 'show' : '')}>
        <div className="event-panel-list">
          {isVisible && this.renderEventList(events)}
        </div>
      </div>
    );
  }

  static propTypes = {
    events: PropTypes.arrayOf(
      PropTypes.shape({
        location: PropTypes.object.isRequired,
      })
    ),
    onEventSelect: PropTypes.func.isRequired,
  };
}

export default EventPanel;
