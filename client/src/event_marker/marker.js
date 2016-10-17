import style from './styles.js';

export default (React) => {
  const marker = ({ alert: { category } }) => (
    <div style={style(category)} />
    );


  marker.propTypes = {
    alert: React.PropTypes.shape({
      category: React.PropTypes.string.isRequired,
    }),
  };

  return marker;
};
