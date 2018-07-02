import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actionCreators from 'client/redux/actionCreators';

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
    this.props.fetchRecentIncidents();
    this.props.connectSocket();
  }

  render() {
    return (
      <AppWrapper>
        <ScreensRooot {...this.props} />{' '}
      </AppWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
