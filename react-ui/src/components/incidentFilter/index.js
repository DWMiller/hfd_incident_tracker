import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  filterTypeToggled,
  allFilterTypesDeselected,
  multipleFilterTypesSelected,
} from '../../store/modules/incidentFilter/type';

import { toggleFilterCollapse, getFilterCollapsed } from 'store/modules/incidentFilter/collapsed';
import { textFilterChanged } from '../../store/modules/incidentFilter/text';

import { availableIncidentTypesSelector } from '../../store/selectors';

import IncidentTextFilter from './TextFilter';
import IncidentFilterControls from './Controls';

import { FilterContainer } from './components';

function IncidentFilter() {
  const dispatch = useDispatch();

  const textFilter = useSelector(state => state.incidentFilter.text);
  const isCollapsed = useSelector(getFilterCollapsed);
  const filters = useSelector(state => state.incidentFilter.types);
  const availableIncidentTypes = useSelector(availableIncidentTypesSelector);

  const toggleCollapse = () => dispatch(toggleFilterCollapse());

  const deselectAllFilterTypes = () => dispatch(allFilterTypesDeselected());

  const selectMultipleFilterTypes = category => dispatch(multipleFilterTypesSelected({ category }));

  const toggleFilterType = category => dispatch(filterTypeToggled({ category }));

  const setTextFilter = text => dispatch(textFilterChanged({ text }));

  return (
    <FilterContainer className={isCollapsed ? ' collapsed' : ''}>
      <button onClick={toggleCollapse} className="title">
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

export default IncidentFilter;
