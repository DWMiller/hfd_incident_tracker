import eventItemCreate from './event-panel-item';
import store from '../reducers/store';

export default React => {
  const EventItem = eventItemCreate(React);

  const state = {
    active: null
  };

  store.subscribe(() => {
    state.active = store.getState().eventPanel.active;
  });

  function onEventHover(eventId) {
    if (state.active !== eventId) {
      store.dispatch({ type: 'SET_ACTIVE_EVENT', eventId });
    }
  }

  function renderEventList(events) {
    const sorted = events.sort((a, b) => a.time < b.time ? 1 : -1);

    return sorted.map(event => {
      const isActive = event.id === state.active;

      return (
        <EventItem
          onEventHover={onEventHover}
          isActive={isActive}
          {...event}
          key={event.id}
        />
      );
    });
  }

  const Panel = ({ events }) => {
    const eventList = renderEventList(events);
    return (
      <div className="event-panel">

        {eventList}

      </div>
    );
  };

  Panel.propTypes = {
    events: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        coordinates: React.PropTypes.object.isRequired
      })
    )
  };

  return Panel;
};
