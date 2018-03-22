import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { eventType } from '../../types';

import EventPanelItem from './EventPanelItem';
import EventPanelTextFilter from './EventPanelFilter';

import './EventPanel.css';

export class EventPanel extends Component {
  static propTypes = {
    events: PropTypes.arrayOf(eventType),
    onEventSelect: PropTypes.func.isRequired,
    setActiveEvent: PropTypes.func.isRequired,
    active: PropTypes.string,
    isVisible: PropTypes.bool.isRequired,
    textFilter: PropTypes.string,
  };

  updateFilter = filterText => {
    this.props.setTextFilter(filterText);
  };

  onEventHover = eventId => {
    if (this.props.active !== eventId) {
      this.props.setActiveEvent(eventId);
    }
  };

  renderEventList = (events, filterText) => {
    const renderedEvents = events.map(event => {
      const isActive = event.id === this.props.active;

      return (
        <EventPanelItem
          onEventHover={this.onEventHover}
          onEventSelect={this.props.onEventSelect}
          isActive={isActive}
          event={event}
          key={event._id}
        />
      );
    });

    return renderedEvents;
  };

  shouldComponentUpdate(nextProps, nextState) {
    //TODO - This seems like a bit much, think on alternatives to skip re-rendering the list
    if (
      nextProps.textFilter !== this.props.textFilter ||
      nextProps.active !== this.props.active ||
      nextProps.events.length !== this.props.events.length ||
      nextProps.isVisible !== this.props.isVisible
    ) {
      return true;
    }

    return false;
  }

  render() {
    if (!this.props.isVisible) {
      return <div className="event-panel" />;
    }

    const Events = this.renderEventList(this.props.events, this.props.textFilter);

    return (
      <div className={'event-panel show'}>
        <EventPanelTextFilter filterText={this.props.textFilter} updateFilter={this.updateFilter} />
        <div className="event-panel-list">{Events}</div>
      </div>
    );
  }
}

export default EventPanel;
