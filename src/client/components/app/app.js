import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../actions/actionCreators';

import Map from '../Map';
import EventPanel from '../EventPanel';
import EventFilter from '../EventFilter';
import './app.css';

import eventTypes from '../../config/event-types';

class App extends Component {
  eventSelected = event => {
    this.props.mapChange({
      center: {
        lng: event.location.coordinates[0],
        lat: event.location.coordinates[1],
      },
    });
  };

  getFilteredEvents = event => {
    const type = eventTypes[event.category]
      ? eventTypes[event.category]
      : eventTypes['UNKNOWN'];

    return this.props.eventFilter.some(icon => icon === type.icon.file);
  };

  render() {
    const filteredEvents = this.props.events.filter(this.getFilteredEvents);

    const isEventPanelActive = this.props.eventPanel.isVisible;

    return (
      <div className="App">
        <Map
          {...this.props}
          active={this.props.eventPanel.active}
          settings={this.props.map}
          alerts={filteredEvents}
        />
        <EventFilter
          {...this.props}
          filter={this.props.eventFilter}
          events={this.props.events}
        />
        <button
          onClick={this.props.toggleEventPanel}
          className={
            'event-panel-toggle ' + (isEventPanelActive ? 'active' : '')
          }
        >
          View Events
        </button>
        <EventPanel
          {...this.props}
          {...this.props.eventPanel}
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
