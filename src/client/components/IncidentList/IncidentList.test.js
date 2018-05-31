import React from 'react';
import { render } from 'react-dom';
import IncidentList from './IncidentList';

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

describe('<IncidentList />', () => {
  it('renders', () => {
    const div = document.createElement('div');
    render(<IncidentList onIncidentSelect={() => {}} incidents={[fauxIncident]} />, div);
  });
});
