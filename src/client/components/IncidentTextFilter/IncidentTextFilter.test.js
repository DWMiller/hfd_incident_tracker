import React from 'react';
import { render } from 'react-dom';

import IncidentTextFilter from './IncidentTextFilter';

describe('<IncidentTextFilter />', () => {
  it('renders', () => {
    const div = document.createElement('div');
    render(<IncidentTextFilter filterText="" updateFilter={() => {}} />, div);
  });
});
