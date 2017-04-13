import React, { Component } from "react";

import Map from "../map";
import createEventPanel from "../event-panel";
import createEventFilterPanel from "../event-filter";
import "./app.css";
import eventTypes from "../../config/event-types";
import store from "../../reducers/store";

const EventPanel = createEventPanel(React);
const EventFilterPanel = createEventFilterPanel(React);

class App extends Component {
  onEventSelect(event) {
    store.dispatch({
      type: "MAP_CHANGE",
      settings: {
        center: event.coordinates
      }
    });
  }

  render() {
    const filteredEvents = this.props.state.events.filter(event => {
      const type = eventTypes[event.category]
        ? eventTypes[event.category]
        : eventTypes["UNKNOWN"];

      return this.props.state.eventFilter.some(icon => icon === type.icon.file);
    });

    return (
      <div className="App">
        <Map
          active={this.props.state.eventPanel.active}
          settings={this.props.state.map}
          alerts={filteredEvents}
        />
        <EventFilterPanel
          filter={this.props.state.eventFilter}
          events={this.props.state.events}
        />
        <EventPanel
          events={filteredEvents}
          onEventSelect={this.onEventSelect}
        />
      </div>
    );
  }
}

App.propTypes = {
  state: React.PropTypes.object
};

module.exports = App;
