import eventTypes from '../config/event-types';
import store from '../reducers/store';
import './event-filter.css';

import eventFilterTypeButtonCreate from './event-filter-button';

function getEventTypes(events) {
  return Object.keys(
    events.reduce(
      (obj, event) => {
        const type = eventTypes[event.category]
          ? eventTypes[event.category]
          : eventTypes['UNKNOWN'];
        obj[type.icon.file] = true;
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
  const EventFilterTypeButton = eventFilterTypeButtonCreate(React);

  function renderTypes(types, filter) {
    return types.map((icon, key) => {
      const props = {
        icon,
        onSelect,
        isSelected: filter.some(filter => filter === icon),
        key
      };

      return <EventFilterTypeButton {...props} />;
    });
  }

  const FilterPanel = ({ events, filter }) => {
    const types = getEventTypes(events);
    const Types = renderTypes(types, filter);

    return <div className={'event-filter-panel'}>{Types}</div>;
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
