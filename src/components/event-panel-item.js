const moment = require('moment');

export default React => {
  const Event = props => {
    const date = moment(parseInt(props.time, 10));

    return (
      <p className="event-panel-item">

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
    intersection: React.PropTypes.string.isRequired
  };

  return Event;
};
