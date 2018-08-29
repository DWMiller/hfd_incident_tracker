import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getRecentIncidents, subscribeIncidents } from 'client/redux/actions/incidents';

import ScreensRooot from 'client/screens/Root';

const AppWrapper = styled.div`
  font-family: Verdana, sans-serif;
  position: relative;
  height: 100%;
  line-height: 1.6;
`;

export class App extends Component {
  static propTypes = {
    state: PropTypes.object,
  };

  componentDidMount() {
    this.props.getRecentIncidents();
    this.props.subscribeIncidents();
  }

  render() {
    return (
      <AppWrapper>
        <ScreensRooot {...this.props} />{' '}
      </AppWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getRecentIncidents,
      subscribeIncidents,
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(App);
