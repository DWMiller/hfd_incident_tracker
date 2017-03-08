import eventTypes from '../../config/event-types';
import store from '../../reducers/store';
import './event-filter.css';

import eventFilterTypeButtonCreate from './event-filter-button';

/**
 * Returns an object containing the present event types only
 * object keys are the type icons
 */
function getEventTypes(events) {
  return Object.keys(
    events.reduce(
      (accumulator, event) => {
        const type = eventTypes[event.category]
          ? eventTypes[event.category]
          : eventTypes.UNKNOWN;
        return Object.assign({}, accumulator, { [type.icon.file]: true });
      },
      {}
    )
  );
}

function onSelect(type) {
  store.dispatch({ type: 'TOGGLE_EVENT_FILTER', category: type });
}

function selectAll(types) {
  store.dispatch({ type: 'SELECT_ALL', category: types });
}

function deselectAll() {
  store.dispatch({ type: 'DESELECT_ALL' });
}

export default React => {
  const EventFilterTypeButton = eventFilterTypeButtonCreate(React);

  const FilterPanel = ({ events, filter }) => {
    const types = getEventTypes(events);

    return (
      <div className={'event-filter-panel'}>
        {types.map((icon, key) => {
          const props = {
            icon,
            onSelect,
            isSelected: filter.some(f => f === icon),
            key,
          };

          return <EventFilterTypeButton {...props} />;
        })}
        <button
          onClick={() => selectAll(types)}
          className={'event-filter-panel-type'}
        >
          All
        </button>
        <button onClick={deselectAll} className={'event-filter-panel-type'}>
          None
        </button>
      </div>
    );
  };

  FilterPanel.propTypes = {
    filter: React.PropTypes.arrayOf(React.PropTypes.string),
    events: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        category: React.PropTypes.string.isRequired,
      })
    ),
  };

  return FilterPanel;
};
