import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../redux/actionCreators';

import MapContainer from '../../components/Map/MapContainer';
import IncidentPanel from '../../components/IncidentPanel/IncidentPanel';
import IncidentFilter from '../../components/IncidentFilter/IncidentFilter';

export class ScreenMain extends Component {
  static propTypes = {
    state: PropTypes.object,
  };

  render() {
    return (
      <div className="App">
        <MapContainer />
        <IncidentFilter />
        <IncidentPanel />
      </div>
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
)(ScreenMain);
