import React from 'react';
import { render } from 'react-dom';

import IncidentPanel from './IncidentPanel';
import IncidentPanelTextFilter from './IncidentPanelFilter';
import IncidentPanelItem from './IncidentPanelItem';

const fauxIncident = {
  category: 'MEDICAL',
  location: {
    address: '123 Fake Street',
    coordinates: [-79.8997007, 43.2301751],
  },
  locationName: 'Fake Spot',
  id: '123',
  _id: '123',
};

it('incident panel renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <IncidentPanel
      isVisible={true}
      incidents={[fauxIncident]}
      onIncidentSelect={() => {}}
      textFilter=""
      setTextFilter={() => {}}
    />,
    div
  );
});

it('incident panel filter renders without crashing', () => {
  const div = document.createElement('div');
  render(<IncidentPanelTextFilter filterText="" updateFilter={() => {}} />, div);
});

it('incident panel item renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <IncidentPanelItem
      onIncidentHover={() => {}}
      onIncidentSelect={() => {}}
      isActive={true}
      incident={fauxIncident}
      key={fauxIncident._id}
    />,
    div
  );
});
