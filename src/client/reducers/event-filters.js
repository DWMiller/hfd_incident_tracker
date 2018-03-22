import { createSelector } from 'reselect';
import { eventDefinitions } from '../config/event-definitions';

import { eventsSelector } from './events';

export const typeFilterReducer = (state = [], { type, category } = {}) => {
  switch (type) {
    case 'TOGGLE_EVENT_FILTER': {
      const isActive = state.findIndex(t => t === category);
      if (isActive === -1) {
        return [...state, category];
      }
      return [...state.slice(0, isActive), ...state.slice(isActive + 1)];
    }
    case 'DESELECT_ALL': {
      return [];
    }
    case 'SELECT_MULTIPLE': {
      return [...category];
    }
    default:
      return state;
  }
};

export const textFilterReducer = (state = '', { type, text } = {}) => {
  switch (type) {
    case 'SET_TEXT_FILTER': {
      return text;
    }
    default:
      return state;
  }
};

export const availableEventTypesSelector = createSelector([eventsSelector], (events = []) => {
  return Object.keys(
    events.reduce((accumulator, event) => {
      const type = eventDefinitions[event.category]
        ? eventDefinitions[event.category]
        : eventDefinitions.UNKNOWN;
      return Object.assign({}, accumulator, { [type.icon]: true });
    }, {})
  );
});
