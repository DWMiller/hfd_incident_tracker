import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ScreenOverview from './Overview';
import ScreenIncident from './Incident';

function Root() {
  return (
    <Router>
      <Switch>
        <Route path="/incident/:code" component={ScreenIncident} />
        <Route path="/overview" component={ScreenOverview} />
        <Route path="/" component={ScreenOverview} />
      </Switch>
    </Router>
  );
}

export default Root;
