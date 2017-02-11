import React from 'react';
import ReactDOM from 'react-dom';
import createApp from './app';

const App = createApp(React);

const alerts = [
  {
    id: 787773510936657900,
    time: '1476654815788',
    code: 'F16034784',
    type: 'NEW',
    category: 'MEDICAL',
    originalLocation: 'Loc: 0 Block KIMBERLY DR HAM @ PRIVATE RD/SCOTIA AV',
    city: 'Hamilton',
    streets: [ 'KIMBERLY DR', '', 'SCOTIA AV' ],
    intersection: 'KIMBERLY DR at SCOTIA AV, Hamilton',
    _id: '0YLIUX2aC1WYl2D0',
    createdAt: '2017-01-31T21:27:25.114Z',
    updatedAt: '2017-01-31T21:29:00.816Z',
    coordinates: { lat: 43.2285787, lng: -79.8132159 },
    formatted_address: 'Kimberly Dr & Scotia Ave, Hamilton, ON L8K, Canada'
  }
];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App alerts={alerts} />, div);
});
