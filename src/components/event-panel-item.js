const moment = require('moment');

export default React => {
  const Event = props => {
    const date = moment(parseInt(props.time, 10));

    if (props.isActive) {
      props.formatted_address = '';
    }

    return (
      <p
        onMouseOver={() => props.onEventHover(props.id)}
        className="event-panel-item"
      >

        {props.locationName &&
          <span
            className="location"
            dangerouslySetInnerHTML={{ __html: props.locationName }}
          />}

        <span className="address">{props.formatted_address}</span>
        <span className="time">{date.format('MMMM Do h:mm a')}</span>
      </p>
    );
  };

  Event.propTypes = {
    formatted_address: React.PropTypes.string.isRequired
  };

  return Event;
};
