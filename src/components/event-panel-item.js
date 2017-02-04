export default React => {
  const Event = ({ intersection }) => {
    return (
      <p>
        {intersection}
      </p>
    );
  };

  Event.propTypes = {
    intersection: React.PropTypes.string.isRequired
  };

  return Event;
};
