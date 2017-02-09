import eventItemCreate from './event-panel-item';
import store from '../reducers/store';
import './event-panel.css';

export default React => {
  const EventItem = eventItemCreate(React);

  const state = {
    active: null
  };

  const toggleButtonStyle = {
    position: 'absolute',
    right: '100%',
    height: '35px',
    width: '100px',
    boxShadow: '-2px 2px 5px -2px rgba(0, 0, 0, 0.8)'
  };

  store.subscribe(() => {
    Object.assign(state, store.getState().eventPanel);
  });

  function onEventHover({ id }) {
    if (state.active !== id) {
      store.dispatch({ type: 'SET_ACTIVE_EVENT', eventId: id });
    }
  }

  function onEventPanelToggle() {
    store.dispatch({ type: 'TOGGLE_EVENT_PANEL' });
  }

  function renderEventList(events, onEventSelect) {
    const sorted = events.sort((a, b) => a.time < b.time ? 1 : -1);

    return sorted.map(event => {
      const isActive = event.id === state.active;

      return (
        <EventItem
          onEventHover={onEventHover}
          onEventSelect={onEventSelect}
          isActive={isActive}
          {...event}
          key={event.id}
        />
      );
    });
  }

  const Panel = ({ events, onEventSelect }) => {
    const eventList = renderEventList(events, onEventSelect);
    return (
      <div className={'event-panel ' + (state.isVisible ? 'show' : '')}>
        <button
          className="toggle-button"
          onClick={onEventPanelToggle}
          style={toggleButtonStyle}
        >
          View Events
        </button>
        <div className="event-panel-list">
          {eventList}
        </div>
      </div>
    );
  };

  Panel.propTypes = {
    events: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        coordinates: React.PropTypes.object.isRequired
      })
    ),
    onEventSelect: React.PropTypes.func.isRequired
  };

  return Panel;
};
