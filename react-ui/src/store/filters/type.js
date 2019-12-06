import icons from '../../config/icons';

export const TOGGLE_FILTER = '[filter] TOGGLE';
export const DESELECT_ALL_FILTERS = '[filter] DESELECT_ALL';
export const SELECT_MULTIPLE_FILTERS = '[filter] SELECT_MULTIPLE';

// Simple array of strings to enable all filters by default
const defaultFilter = Object.keys(icons).map(key => key);

export const typeFilterReducer = (state = defaultFilter, { type, payload } = {}) => {
  switch (type) {
    case TOGGLE_FILTER: {
      const isActive = state.findIndex(t => t === payload.category);
      if (isActive === -1) {
        return [...state, payload.category];
      }
      return [...state.slice(0, isActive), ...state.slice(isActive + 1)];
    }
    case DESELECT_ALL_FILTERS: {
      return [];
    }
    case SELECT_MULTIPLE_FILTERS: {
      return [...payload.category];
    }
    default:
      return state;
  }
};

export default typeFilterReducer;
