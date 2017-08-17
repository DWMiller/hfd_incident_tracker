import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Map from '../Map';
import EventPanel from '../EventPanel';
import EventFilter from '../EventFilter';
import './app.css';

import eventTypes from '../../config/event-types';

class App extends Component {
  eventSelected = event => {
    this.props.store.dispatch({
      type: 'MAP_CHANGE',
      settings: {
        center: {
          lng: event.location.coordinates[0],
          lat: event.location.coordinates[1],
        },
      },
    });
  };

  toggleEventPanel = () => {
    this.props.store.dispatch({ type: 'TOGGLE_EVENT_PANEL' });
  };

  getFilteredEvents = event => {
    const type = eventTypes[event.category]
      ? eventTypes[event.category]
      : eventTypes['UNKNOWN'];

    return this.props.state.eventFilter.some(icon => icon === type.icon.file);
  };

  render() {
    const filteredEvents = this.props.state.events.filter(
      this.getFilteredEvents
    );

    const isEventPanelActive = this.props.state.eventPanel.isVisible;

    return (
      <div className="App">
        <Map
          store={this.props.store}
          active={this.props.state.eventPanel.active}
          settings={this.props.state.map}
          alerts={filteredEvents}
        />
        <EventFilter
          store={this.props.store}
          filter={this.props.state.eventFilter}
          events={this.props.state.events}
        />
        <button
          onClick={this.toggleEventPanel}
          className={
            'event-panel-toggle ' + (isEventPanelActive ? 'active' : '')
          }
        >
          View Events
        </button>
        <EventPanel
          {...this.props.state.eventPanel}
          store={this.props.store}
          events={filteredEvents}
          onEventSelect={this.eventSelected}
        />
      </div>
    );
  }

  static propTypes = {
    state: PropTypes.object,
  };
}

export default App;
