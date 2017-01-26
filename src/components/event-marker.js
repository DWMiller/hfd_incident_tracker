import style from './event-marker.styles';

export default React => {
  const Marker = ({ alert }) => {
    return <div style={style(alert.category)} />;
  };

  Marker.propTypes = {
    alert: React.PropTypes.shape({
      category: React.PropTypes.string.isRequired
    })
  };

  return Marker;
};
