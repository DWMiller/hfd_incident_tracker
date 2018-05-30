import * as actionTypes from './actionTypes';

export const typeFilterReducer = (state = [], { type, category } = {}) => {
  switch (type) {
    case actionTypes.TOGGLE_INCIDENT_FILTER: {
      const isActive = state.findIndex(t => t === category);
      if (isActive === -1) {
        return [...state, category];
      }
      return [...state.slice(0, isActive), ...state.slice(isActive + 1)];
    }
    case actionTypes.DESELECT_ALL: {
      return [];
    }
    case actionTypes.SELECT_MULTIPLE: {
      return [...category];
    }
    default:
      return state;
  }
};

export const textFilterReducer = (state = '', { type, text } = {}) => {
  switch (type) {
    case actionTypes.SET_TEXT_FILTER: {
      return text;
    }
    default:
      return state;
  }
};

export const collapsePanelReducer = (state = '', { type } = {}) => {
  switch (type) {
    case actionTypes.TOGGLE_FILTER_PANEL: {
      return !state;
    }
    default:
      return state;
  }
};
