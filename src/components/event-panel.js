import eventItemCreate from './event-panel-item';

export default React => {
  const EventItem = eventItemCreate(React);

  function onEventHover(...args) {
    console.log(args);
  }

  function renderEventList(events) {
    return events.map(event => {
      return <EventItem {...event} key={event._id} />;
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
