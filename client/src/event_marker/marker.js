import style from './styles';

export default (React) => {
  const Marker = ({ alert }) => (
    <div test={alert.category} style={style(alert.category)} />
  );

  Marker.propTypes = {
    alert: React.PropTypes.shape({
      category: React.PropTypes.string.isRequired,
    }),
  };

  return Marker;
};
