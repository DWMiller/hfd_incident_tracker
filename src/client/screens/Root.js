import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import ScreenOverview from './Overview';
import ScreenIncident from './Incident';

export default class componentName extends PureComponent {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <Switch>
          <Route
            path="/incident/:code"
            render={({ match }) => <ScreenIncident code={match.params.code} />}
          />
          <Route path="/overview" component={ScreenOverview} />
          <Route path="/" component={ScreenOverview} />
        </Switch>
      </ConnectedRouter>
    );
  }
}
