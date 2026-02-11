import React from 'react';
import PropTypes from 'prop-types';
import IncidentFilterButton from './Button';
import { ToggleRow, TypeList } from './components';

const IncidentFilterControls = React.memo(function IncidentFilterControls({
  filters,
  availableIncidentTypes,
  toggleIncidentFilter,
  deselectAllIncidentFilters,
  selectMultipleIncidentFilters,
  incidentCounts,
}) {
  const selectAll = () => selectMultipleIncidentFilters(availableIncidentTypes);

  return (
    <>
      <ToggleRow>
        <button onClick={selectAll}>Show All</button>
        <button onClick={deselectAllIncidentFilters}>Hide All</button>
      </ToggleRow>
      <TypeList>
        {availableIncidentTypes.map(icon => (
          <IncidentFilterButton
            key={icon}
            isSelected={filters.includes(icon)}
            icon={icon}
            toggleIncidentFilter={toggleIncidentFilter}
            count={incidentCounts[icon] || 0}
          />
        ))}
      </TypeList>
    </>
  );
});

IncidentFilterControls.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string),
  availableIncidentTypes: PropTypes.arrayOf(PropTypes.string),
  toggleIncidentFilter: PropTypes.func.isRequired,
  deselectAllIncidentFilters: PropTypes.func.isRequired,
  selectMultipleIncidentFilters: PropTypes.func.isRequired,
  incidentCounts: PropTypes.object,
};

export default IncidentFilterControls;
