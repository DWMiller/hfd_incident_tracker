import React, { PureComponent } from 'react';
import { eventListType, genericHandlerType } from '../../types';

import EventPanelItem from '../event_panel_item/panel-item';
import EventPanelTextFilter from '../event_panel_text_filter/filter';

import './event-panel.css';

export class EventPanel extends PureComponent {
  static propTypes = {
    events: eventListType,
    onEventSelect: genericHandlerType.isRequired,
  };

  state = {
    filterText: '',
  };

  updateFilter = filterText => {
    this.setState({
      filterText,
    });
  };

  onEventHover = eventId => {
    if (this.props.active !== eventId) {
      this.props.setActiveEvent(eventId);
    }
  };

  renderEventList = (events, filterText) => {
    const filteredEvents = events.filter(event => {
      const normalizedFilterFields = (
        event.location.address +
        event.locationName +
        event.category
      ).toUpperCase();
      return normalizedFilterFields.includes(filterText.toUpperCase());
    });

    const renderedEvents = filteredEvents.map(event => {
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

  render() {
    if (!this.props.isVisible) {
      return <div className="event-panel" />;
    }

    return (
      <div className={'event-panel show'}>
        <EventPanelTextFilter filterText={this.state.filterText} updateFilter={this.updateFilter} />
        <div className="event-panel-list">
          {this.renderEventList(this.props.events, this.state.filterText)}
        </div>
      </div>
    );
  }
}

export default EventPanel;
