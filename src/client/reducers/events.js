import { createSelector } from 'reselect';
import { eventDefinitions } from '../config/event-definitions';

export default (state = [], { type, event, events } = {}) => {
  switch (type) {
    case 'ADD_EVENT':
      return [...state, event];
    case 'ADD_EVENTS':
      return [...state, ...events];
    case 'CLEAR_EVENTS':
      return [];
    default:
      return state;
  }
};

export const eventTypeFilterSelector = state => state.filters.types;
export const eventTextFilterSelector = state => state.filters.text;

export const eventsSelector = state => state.events;

const filterByTypes = (event, types) => {
  const type = eventDefinitions[event.category]
    ? eventDefinitions[event.category]
    : eventDefinitions['UNKNOWN'];

  return types.some(icon => icon === type.icon.file);
};

const filterByText = (event, text) => {
  const normalizedFilterFields = (
    event.location.address +
    event.locationName +
    event.category
  ).toUpperCase();
  return normalizedFilterFields.includes(text.toUpperCase());
};

export const filteredEventsSelector = createSelector(
  [eventsSelector, eventTypeFilterSelector, eventTextFilterSelector],
  (events, filterTypes, filterText) => {
    console.log('running');
    return events
      .filter(event => filterByTypes(event, filterTypes))
      .filter(event => filterByText(event, filterText));
  }
);
