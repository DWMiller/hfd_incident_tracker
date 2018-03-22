import React from 'react';
import { render } from 'react-dom';

import IncidentFilter from './IncidentFilter';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <IncidentFilter
      toggleIncidentFilter={() => {}}
      deselectAllIncidentFilters={() => {}}
      selectMultipleIncidentFilters={() => {}}
      filter={[]}
      availableIncidentTypes={['type1', 'type2']}
    />,
    div
  );
});
