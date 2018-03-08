import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import io from 'socket.io-client';

import * as actionCreators from '../../actions/actionCreators';

import MapContainer from '../map';
import EventPanel from '../event_panel';
import EventFilter from '../event_filter/filter';

import './app.css';

import { eventDefinitions } from '../../config/event-definitions';

const fetchRecentIncidents = async () => {
  const path = window.location.port ? '//localhost:3001' : '';
  const response = await fetch(`${path}/recent`);
  return await response.json();
};

class App extends Component {
  static propTypes = {
    state: PropTypes.object,
  };

  constructor(props) {
    super(props);

    const socket = window.location.port ? io('//localhost:3001') : io();
    socket.on('event', event => {
      console.log(event);
      this.props.addEvent(event);
    });

    fetchRecentIncidents().then(events => {
      this.props.clearEvents();
      this.props.addEvents(events);
    });
  }

  eventSelected = event => {
    this.props.mapChange({
      center: {
        lng: event.location.coordinates[0],
        lat: event.location.coordinates[1],
      },
    });
  };

  getFilteredEvents = event => {
    const type = eventDefinitions[event.category]
      ? eventDefinitions[event.category]
      : eventDefinitions['UNKNOWN'];

    return this.props.eventFilter.some(icon => icon === type.icon.file);
  };

  render() {
    const filteredEvents = this.props.events.filter(this.getFilteredEvents);

    const isEventPanelActive = this.props.eventPanel.isVisible;

    return (
      <div className="App">
        <MapContainer
          mapChange={this.props.mapChange}
          active={this.props.eventPanel.active}
          settings={this.props.map}
          alerts={filteredEvents}
        />
        <EventFilter
          toggleEventFilter={this.props.toggleEventFilter}
          deselectAllEventFilters={this.props.deselectAllEventFilters}
          selectMultipleEventFilters={this.props.selectMultipleEventFilters}
          filter={this.props.eventFilter}
          events={this.props.events}
        />
        <button
          onClick={this.props.toggleEventPanel}
          className={'event-panel-toggle ' + (isEventPanelActive ? 'active' : '')}
        >
          View Events
        </button>
        <EventPanel
          {...this.props.eventPanel}
          setActiveEvent={this.props.setActiveEvent}
          events={filteredEvents}
          onEventSelect={this.eventSelected}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.events,
    eventPanel: state.eventPanel,
    eventFilter: state.eventFilter,
    map: state.map,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
