import eventTypes from '../config/event-types';
import store from '../reducers/store';
import './event-filter.css';

function getEventTypes(events) {
  return Object.keys(
    events.reduce(
      (obj, e) => {
        obj[e.category] = null;
        return obj;
      },
      {}
    )
  );
}

function onSelect(type) {
  store.dispatch({ type: 'TOGGLE_EVENT_FILTER', category: type });
}

export default React => {
  function renderTypes(types, filter) {
    return types.map((type, index) => {
      const isSelected = filter.some(filter => filter === type);

      const icon = eventTypes[type]
        ? eventTypes[type].icon
        : eventTypes['UNKNOWN'].icon;

      return (
        <div
          onClick={() => {
            onSelect(type);
          }}
          title={type}
          key={index}
          className={
            'event-filter-panel-type ' + (isSelected ? 'selected' : '')
          }
        >
          <img role="presentation" src={'img/' + icon.file} />
        </div>
      );
    });
  }

  const FilterPanel = ({ events, filter }) => {
    const types = getEventTypes(events);
    return (
      <div className={'event-filter-panel'}>{renderTypes(types, filter)}</div>
    );
  };

  FilterPanel.propTypes = {
    filter: React.PropTypes.arrayOf(React.PropTypes.string),
    events: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        category: React.PropTypes.string.isRequired
      })
    )
  };

  return FilterPanel;
};
