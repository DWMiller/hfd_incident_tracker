import style from './event-marker.styles';

export default React => {
  const Marker = ({ alert, isActive = false, onEventHover }) => {
    return (
      <div
        className="event-marker"
        onMouseOver={() => onEventHover(alert.id)}
        style={style(alert, isActive)}
      />
    );
  };

  Marker.propTypes = {
    alert: React.PropTypes.shape({
      category: React.PropTypes.string.isRequired
    })
  };

  return Marker;
};
