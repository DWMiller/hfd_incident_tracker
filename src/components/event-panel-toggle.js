import './event-panel-toggle.css';

export default React => {
  const Button = ({ onClick }) => (
    <button onClick={onClick} className="event-pannel-toggle">
      View Events
    </button>
  );

  Button.propTypes = {
    onClick: React.PropTypes.func.isRequired
  };

  return Button;
};
