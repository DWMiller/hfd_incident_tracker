import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../redux/actionCreators';

import {
  availableIncidentTypesSelector,
  filteredIncidentsSelector,
  recentIncidentsSelector,
} from '../../redux/selectors';

import MapContainer from '../Map/MapContainer';
import IncidentPanel from '../IncidentPanel/IncidentPanel';
import IncidentFilter from '../IncidentFilter/IncidentFilter';

import './App.css';

class App extends Component {
  static propTypes = {
    state: PropTypes.object,
  };

  componentDidMount() {
    this.props.fetchRecentIncidents();
    this.props.connectSocket();
  }

  incidentSelected = incident => {
    this.props.mapChange({
      center: {
        lng: incident.location.coordinates[0],
        lat: incident.location.coordinates[1],
      },
    });

    this.props.setActiveMarker(incident.code);
  };

  render() {
    return (
      <div className="App">
        <MapContainer />
        <IncidentFilter
          toggleIncidentFilter={this.props.toggleIncidentFilter}
          deselectAllIncidentFilters={this.props.deselectAllIncidentFilters}
          selectMultipleIncidentFilters={this.props.selectMultipleIncidentFilters}
          filter={this.props.filters.types}
          availableIncidentTypes={this.props.availableIncidentTypes}
          textFilter={this.props.filters.text}
          setTextFilter={this.props.setTextFilter}
          isCollapsed={this.props.filters.isCollapsed}
          toggleCollapsed={this.props.toggleFilterPanel}
        />
        <IncidentPanel
          isVisible={this.props.incidentPanel.isVisible}
          incidents={this.props.recentIncidents}
          onIncidentSelect={this.incidentSelected}
          toggleIncidentPanel={this.props.toggleIncidentPanel}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    recentIncidents: recentIncidentsSelector(state),
    filteredIncidents: filteredIncidentsSelector(state),
    availableIncidentTypes: availableIncidentTypesSelector(state),
    incidents: state.incidents,
    incidentPanel: state.incidentPanel,
    filters: state.filters,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
