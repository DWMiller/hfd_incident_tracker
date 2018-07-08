export const TOGGLE_FILTER_COLLAPSE = '[ui] TOGGLE_FILTER_COLLAPSE';

export const toggleFilterCollapse = () => ({
  type: TOGGLE_FILTER_COLLAPSE,
});

export const filterPanelCollapseReducer = (state = false, { type } = {}) => {
  switch (type) {
    case TOGGLE_FILTER_COLLAPSE: {
      return !state;
    }
    default:
      return state;
  }
};

export default filterPanelCollapseReducer;
