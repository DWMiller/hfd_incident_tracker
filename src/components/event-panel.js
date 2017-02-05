import eventItemCreate from './event-panel-item';

export default React => {
  const EventItem = eventItemCreate(React);
  //
  // function onEventHover(...args) {
  //   console.log(args);
  // }

  function renderEventList(events) {
    const sorted = events.sort((a, b) => a.time < b.time ? 1 : -1);

    return sorted.map(event => {
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
