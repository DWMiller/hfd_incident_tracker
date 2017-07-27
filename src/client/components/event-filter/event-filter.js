import React from 'react';
import PropTypes from 'prop-types';

import eventTypes from '../../config/event-types';
import store from '../../reducers/store';
import './event-filter.css';

import EventFilterTypeButton from './event-filter-button';

/**
 * Returns an object containing the present event types only
 * object keys are the type icons
 */
function getEventTypes(events = []) {
  return Object.keys(
    events.reduce((accumulator, event) => {
      const type = eventTypes[event.category]
        ? eventTypes[event.category]
        : eventTypes.UNKNOWN;
      return Object.assign({}, accumulator, { [type.icon.file]: true });
    }, {})
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
  filter: PropTypes.arrayOf(PropTypes.string),
  events: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
    })
  ),
};

export default FilterPanel;
