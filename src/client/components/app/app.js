import createMap from '../map';
import createEventPanel from '../event-panel';
import createEventFilterPanel from '../event-filter';
import './app.css';
import eventTypes from '../../config/event-types';
import store from '../../reducers/store';

export default React => {
  const Map = createMap(React);
  const EventPanel = createEventPanel(React);
  const EventFilterPanel = createEventFilterPanel(React);

  function onEventSelect(event) {
    store.dispatch({
      type: 'MAP_CHANGE',
      settings: {
        center: event.coordinates
      }
    });
  }

  const App = props => {
    const filteredEvents = props.state.events.filter(event => {
      const type = eventTypes[event.category]
        ? eventTypes[event.category]
        : eventTypes['UNKNOWN'];

      return props.state.eventFilter.some(icon => icon === type.icon.file);
    });

    return (
      <div className="App">
        <Map
          active={props.state.eventPanel.active}
          settings={props.state.map}
          alerts={filteredEvents}
        />
        <EventFilterPanel
          filter={props.state.eventFilter}
          events={props.state.events}
        />
        <EventPanel events={filteredEvents} onEventSelect={onEventSelect} />
      </div>
    );
  };
  App.propTypes = {
    state: React.PropTypes.object
  };
  return App;
};
