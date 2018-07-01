import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import ScreenMap from './Map/Map';
import ScreenIncident from './Incident/Incident';

export default class componentName extends Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <Switch>
          <Route
            path="/incident/:code"
            render={({ match }) => <ScreenIncident code={match.params.code} />}
          />
          <Route path="/map" component={ScreenMap} />
          <Route path="/" component={ScreenMap} />
        </Switch>
      </ConnectedRouter>
    );
  }
}
