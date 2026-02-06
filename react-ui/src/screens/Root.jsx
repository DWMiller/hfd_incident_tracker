import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ScreenOverview from './Overview';
import ScreenIncident from './Incident';
import ScreenActivity from './Activity';

function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/activity" element={<ScreenActivity />} />
        <Route path="/:code" element={<ScreenIncident />} />
        <Route path="/" element={<ScreenOverview />} />
      </Routes>
    </Router>
  );
}

export default Root;
