import React from 'react';
import { render } from 'react-dom';

import EventPanel from './EventPanel';
import EventPanelTextFilter from './EventPanelFilter';
import EventPanelItem from './EventPanelItem';

const fauxEvent = {
  category: 'MEDICAL',
  location: {
    address: '123 Fake Street',
    coordinates: [-79.8997007, 43.2301751],
  },
  locationName: 'Fake Spot',
  id: '123',
  _id: '123',
};

it('event panel renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <EventPanel
      isVisible={true}
      setActiveEvent={() => {}}
      events={[fauxEvent]}
      onEventSelect={() => {}}
      textFilter=""
      setTextFilter={() => {}}
    />,
    div
  );
});

it('event panel filter renders without crashing', () => {
  const div = document.createElement('div');
  render(<EventPanelTextFilter filterText="" updateFilter={() => {}} />, div);
});

it('event panel item renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <EventPanelItem
      onEventHover={() => {}}
      onEventSelect={() => {}}
      isActive={true}
      event={fauxEvent}
      key={fauxEvent._id}
    />,
    div
  );
});
