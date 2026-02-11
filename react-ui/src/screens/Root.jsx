import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './Landing';
import App from '../components/App';

function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/app/*" element={<App />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default Root;
