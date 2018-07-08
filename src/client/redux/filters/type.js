export const TOGGLE_FILTER = '[filter] TOGGLE';
export const DESELECT_ALL_FILTERS = '[filter] DESELECT_ALL';
export const SELECT_MULTIPLE_FILTERS = '[filter] SELECT_MULTIPLE';

export const toggleFilterType = category => ({
  type: TOGGLE_FILTER,
  category,
});

export const selectMultipleFilterTypes = category => ({
  type: SELECT_MULTIPLE_FILTERS,
  category,
});

export const deselectAllFilterTypes = () => ({
  type: DESELECT_ALL_FILTERS,
});

export const typeFilterReducer = (state = [], { type, category } = {}) => {
  switch (type) {
    case TOGGLE_FILTER: {
      const isActive = state.findIndex(t => t === category);
      if (isActive === -1) {
        return [...state, category];
      }
      return [...state.slice(0, isActive), ...state.slice(isActive + 1)];
    }
    case DESELECT_ALL_FILTERS: {
      return [];
    }
    case SELECT_MULTIPLE_FILTERS: {
      return [...category];
    }
    default:
      return state;
  }
};

export default typeFilterReducer;
