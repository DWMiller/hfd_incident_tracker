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

  function onEventHover({ id }) {
    if (state.active !== id) {
      store.dispatch({ type: 'SET_ACTIVE_EVENT', eventId: id });
    }
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
    ),
    onEventSelect: React.PropTypes.func.isRequired
  };

  return Panel;
};
