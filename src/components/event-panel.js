import eventItemCreate from './event-panel-item';

export default React => {
  const EventItem = eventItemCreate(React);

  const state = {
    activeEvent: null
  };

  function onEventHover(eventId) {
    if (state.activeEvent === eventId) {
      return;
    }

    state.activeEvent = eventId;
  }

  function renderEventList(events) {
    const sorted = events.sort((a, b) => a.time < b.time ? 1 : -1);

    return sorted.map(event => {
      const isActive = event.id === state.activeEventl;

      return (
        <EventItem
          onEventHover={onEventHover}
          isActive={isActive}
          {...event}
          key={event._id}
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
