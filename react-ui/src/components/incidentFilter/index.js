import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { TOGGLE_FILTER_COLLAPSE } from '../../store/ui/filterCollapse';

import {
  DESELECT_ALL_FILTERS,
  SELECT_MULTIPLE_FILTERS,
  TOGGLE_FILTER,
} from '../../store/filters/type';

import { SET_TEXT_FILTER } from '../../store/filters/text';

import { availableIncidentTypesSelector } from '../../store/selectors';

import IncidentTextFilter from './TextFilter';
import IncidentFilterControls from './Controls';

import { FilterContainer } from './components';

function IncidentFilter() {
  const dispatch = useDispatch();

  const textFilter = useSelector(state => state.filters.text);
  const isCollapsed = useSelector(state => state.ui.isFilterCollapsed);
  const filters = useSelector(state => state.filters.types);
  const availableIncidentTypes = useSelector(availableIncidentTypesSelector);

  const toggleFilterCollapse = () => dispatch({ type: TOGGLE_FILTER_COLLAPSE });

  const deselectAllFilterTypes = () => dispatch({ type: DESELECT_ALL_FILTERS });

  const selectMultipleFilterTypes = category =>
    dispatch({
      type: SELECT_MULTIPLE_FILTERS,
      payload: { category },
    });

  const toggleFilterType = category =>
    dispatch({
      type: TOGGLE_FILTER,
      payload: { category },
    });

  const setTextFilter = text => dispatch({ type: SET_TEXT_FILTER, payload: { text } });

  return (
    <FilterContainer className={isCollapsed ? ' collapsed' : ''}>
      <button onClick={toggleFilterCollapse} className="title">
        Filter Incidents
        {isCollapsed ? ' [ + ]' : ' [ - ]'}
      </button>

      <div className="content">
        <IncidentTextFilter filterText={textFilter} updateFilter={setTextFilter} />

        <IncidentFilterControls
          filters={filters}
          availableIncidentTypes={availableIncidentTypes}
          toggleIncidentFilter={toggleFilterType}
          selectMultipleIncidentFilters={selectMultipleFilterTypes}
          deselectAllIncidentFilters={deselectAllFilterTypes}
        />
      </div>
    </FilterContainer>
  );
}

IncidentFilter.propTypes = {
  availableIncidentTypes: PropTypes.arrayOf(PropTypes.string),
  filters: PropTypes.arrayOf(PropTypes.string),
  textFilter: PropTypes.string,
  isCollapsed: PropTypes.bool.isRequired,
  setTextFilter: PropTypes.func.isRequired,
  toggleFilterCollapse: PropTypes.func.isRequired,
  toggleFilterType: PropTypes.func.isRequired,
  selectMultipleFilterTypes: PropTypes.func.isRequired,
  deselectAllFilterTypes: PropTypes.func.isRequired,
};

export default IncidentFilter;
