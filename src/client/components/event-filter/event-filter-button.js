export default React => {
  const EventFilterButton = ({ onSelect, isSelected, icon }) => {
    return (
      <div
        onClick={() => {
          onSelect(icon);
        }}
        className={'event-filter-panel-type ' + (isSelected ? 'selected' : '')}
      >
        <img role="presentation" src={'img/' + icon} />
      </div>
    );
  };

  EventFilterButton.propTypes = {
    onSelect: React.PropTypes.func.isRequired,
    isSelected: React.PropTypes.bool,
    icon: React.PropTypes.string.isRequired
  };

  return EventFilterButton;
};
