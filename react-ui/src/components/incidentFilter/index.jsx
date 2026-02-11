import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

import {
  filterTypeToggled,
  allFilterTypesDeselected,
  multipleFilterTypesSelected,
} from '../../store/modules/incidentFilter/type';
import { toggleFilterCollapse } from '../../store/modules/incidentFilter/collapsed';
import { textFilterChanged } from '../../store/modules/incidentFilter/text';

import { availableIncidentTypesSelector, incidentCountsByTypeSelector } from '../../store/selectors';

import IncidentTextFilter from './TextFilter';
import IncidentFilterControls from './Controls';

import { FilterPanel, PanelHeader, HeaderTitle, HeaderCount, HeaderChevron, PanelContent, Disclaimer } from './components';

function IncidentFilter() {
  const dispatch = useDispatch();

  const textFilter = useSelector(state => state.incidentFilter.text);
  const isCollapsed = useSelector(state => state.incidentFilter.collapsed);
  const filters = useSelector(state => state.incidentFilter.types);
  const availableIncidentTypes = useSelector(availableIncidentTypesSelector);
  const incidentCounts = useSelector(incidentCountsByTypeSelector);

  const visibleCount = filters.filter(f => availableIncidentTypes.includes(f)).length;
  const totalCount = availableIncidentTypes.length;

  const toggleCollapse = () => dispatch(toggleFilterCollapse());
  const deselectAllFilterTypes = () => dispatch(allFilterTypesDeselected());
  const selectMultipleFilterTypes = category => dispatch(multipleFilterTypesSelected({ category }));
  const toggleFilterType = category => dispatch(filterTypeToggled({ category }));
  const setTextFilter = text => dispatch(textFilterChanged({ text }));

  return (
    <FilterPanel>
      <PanelHeader onClick={toggleCollapse}>
        <HeaderTitle>Incidents</HeaderTitle>
        <HeaderCount>
          {visibleCount} of {totalCount}
        </HeaderCount>
        <HeaderChevron>{isCollapsed ? <FaChevronDown /> : <FaChevronUp />}</HeaderChevron>
      </PanelHeader>

      {!isCollapsed && (
        <PanelContent>
          <IncidentTextFilter filterText={textFilter} updateFilter={setTextFilter} />

          <IncidentFilterControls
            filters={filters}
            availableIncidentTypes={availableIncidentTypes}
            toggleIncidentFilter={toggleFilterType}
            selectMultipleIncidentFilters={selectMultipleFilterTypes}
            deselectAllIncidentFilters={deselectAllFilterTypes}
            incidentCounts={incidentCounts}
          />

          <Disclaimer>
            Medical and other privacy-restricted calls are not shown on the map.{' '}
            <Link to="/app/activity">View all activity</Link>
          </Disclaimer>
        </PanelContent>
      )}
    </FilterPanel>
  );
}

export default IncidentFilter;
