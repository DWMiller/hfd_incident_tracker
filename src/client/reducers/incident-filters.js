import { createSelector } from 'reselect';
import { incidentDefinitions } from '../config/incident-definitions';

import { incidentsSelector } from './incidents';

export const typeFilterReducer = (state = [], { type, category } = {}) => {
  switch (type) {
    case 'TOGGLE_INCIDENT_FILTER': {
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

export const availableIncidentTypesSelector = createSelector(
  [incidentsSelector],
  (incidents = []) => {
    return Object.keys(
      incidents.reduce((accumulator, incident) => {
        const type = incidentDefinitions[incident.category]
          ? incidentDefinitions[incident.category]
          : incidentDefinitions.UNKNOWN;
        return Object.assign({}, accumulator, { [type.icon]: true });
      }, {})
    );
  }
);
