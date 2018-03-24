import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import io from 'socket.io-client';

import * as actionCreators from '../../actions/actionCreators';
import { filteredIncidentsSelector } from '../../reducers/incidents';
import { availableIncidentTypesSelector } from '../../reducers/incident-filters';

import MapContainer from '../Map/MapContainer';
import IncidentPanel from '../IncidentPanel/IncidentPanel';
import IncidentFilter from '../IncidentFilter/IncidentFilter';

import './App.css';

const fetchRecentIncidents = async () => {
  const path = window.location.port ? '//localhost:3001' : '';
  const response = await fetch(`${path}/recent`);
  return await response.json();
};

class App extends Component {
  static propTypes = {
    state: PropTypes.object,
  };

  constructor(props) {
    super(props);

    const socket = window.location.port ? io('//localhost:3001') : io();
    socket.on('incident', incident => {
      console.log(incident);

      if (!incident) {
        // Server parsing is still a work in progress, skip saving an undefined object if one comes in
        return;
      }

      this.props.addIncident(incident);
    });

    fetchRecentIncidents()
      .then(incidents => {
        this.props.clearIncidents();
        this.props.addIncidents(incidents);
      })
      .catch(err => {
        console.log('Could not fetch recent incidents from server');
      });
  }

  incidentSelected = incident => {
    this.props.mapChange({
      center: {
        lng: incident.location.coordinates[0],
        lat: incident.location.coordinates[1],
      },
    });
  };

  render() {
    return (
      <div className="App">
        <MapContainer
          mapChange={this.props.mapChange}
          active={this.props.incidentPanel.active}
          settings={this.props.map}
          alerts={this.props.filteredIncidents}
        />
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
        <button
          onClick={this.props.toggleIncidentPanel}
          className={
            'incident-panel-toggle ' + (this.props.incidentPanel.isVisible ? 'active' : '')
          }
        >
          Incidents
        </button>
        <IncidentPanel
          isVisible={this.props.incidentPanel.isVisible}
          setActiveIncident={this.props.setActiveIncident}
          incidents={this.props.filteredIncidents}
          onIncidentSelect={this.incidentSelected}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filteredIncidents: filteredIncidentsSelector(state),
    availableIncidentTypes: availableIncidentTypesSelector(state),
    incidents: state.incidents,
    incidentPanel: state.incidentPanel,
    filters: state.filters,
    map: state.map,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
