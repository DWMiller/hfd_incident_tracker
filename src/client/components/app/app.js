import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import io from 'socket.io-client';

import * as actionCreators from '../../actions/actionCreators';
import { filteredEventsSelector } from '../../reducers/events';
import { availableEventTypesSelector } from '../../reducers/event-filters';

import MapContainer from '../map';
import EventPanel from '../event_panel';
import EventFilter from '../event_filter/filter';

import './app.css';

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

      if (!event) {
        // Server parsing is still a work in progress, skip saving an undefined object if one comes in
        return;
      }

      this.props.addEvent(event);
    });

    fetchRecentIncidents()
      .then(events => {
        this.props.clearEvents();
        this.props.addEvents(events);
      })
      .catch(err => {
        console.log('Could not fetch recent incidents from server');
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

  render() {
    return (
      <div className="App">
        <MapContainer
          mapChange={this.props.mapChange}
          active={this.props.eventPanel.active}
          settings={this.props.map}
          alerts={this.props.filteredEvents}
        />
        <EventFilter
          toggleEventFilter={this.props.toggleEventFilter}
          deselectAllEventFilters={this.props.deselectAllEventFilters}
          selectMultipleEventFilters={this.props.selectMultipleEventFilters}
          filter={this.props.filters.types}
          availableEventTypes={this.props.availableEventTypes}
        />
        <button
          onClick={this.props.toggleEventPanel}
          className={'event-panel-toggle ' + (this.props.eventPanel.isVisible ? 'active' : '')}
        >
          View Events
        </button>
        <EventPanel
          isVisible={this.props.eventPanel.isVisible}
          setActiveEvent={this.props.setActiveEvent}
          events={this.props.filteredEvents}
          onEventSelect={this.eventSelected}
          textFilter={this.props.filters.text}
          setTextFilter={this.props.setTextFilter}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filteredEvents: filteredEventsSelector(state),
    availableEventTypes: availableEventTypesSelector(state),
    events: state.events,
    eventPanel: state.eventPanel,
    filters: state.filters,
    map: state.map,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
