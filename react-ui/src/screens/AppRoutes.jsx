import React from 'react';

import { Routes, Route } from 'react-router-dom';

import ScreenOverview from './Overview';
import ScreenIncident from './Incident';
import ScreenActivity from './Activity';

function AppRoutes() {
  return (
    <Routes>
      <Route path="activity" element={<ScreenActivity />} />
      <Route path=":code" element={<ScreenIncident />} />
      <Route path="" element={<ScreenOverview />} />
    </Routes>
  );
}

export default AppRoutes;
