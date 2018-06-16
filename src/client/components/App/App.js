import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../redux/actionCreators';

import ScreensRooot from '../../screens/Root';

import './App.css';

export class App extends Component {
  static propTypes = {
    state: PropTypes.object,
  };

  componentDidMount() {
    this.props.fetchRecentIncidents();
    this.props.connectSocket();
  }

  render() {
    return <ScreensRooot {...this.props} />;
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
