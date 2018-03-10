import React from 'react';
import { render } from 'react-dom';

import EventFilter from './filter';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <EventFilter
      toggleEventFilter={() => {}}
      deselectAllEventFilters={() => {}}
      selectMultipleEventFilters={() => {}}
      filter={[]}
      availableEventTypes={['type1', 'type2']}
    />,
    div
  );
});
