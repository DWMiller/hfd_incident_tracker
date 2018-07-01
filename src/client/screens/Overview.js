import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from 'client/redux/actionCreators';

import OverviewMap from './overview/Map';

import IncidentPanel from './overview/IncidentPanel';
import IncidentFilter from './overview/IncidentFilter';

export class ScreenOverview extends Component {
  render() {
    return (
      <div>
        <OverviewMap />
        <IncidentFilter />
        <IncidentPanel />
      </div>
    );
  }
}

ScreenOverview.propTypes = {
  state: PropTypes.object,
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenOverview);
