import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actionCreators from '../redux/actionCreators';
import { recentIncidentsSelector } from '../redux/selectors';

import { incidentType } from '../types';

import List from '../components/List';
import Incident from './incidentPanel/Incident';

import { IncidentPanelWrapper, ToggleButton } from './incidentPanel/components';

export class IncidentPanel extends React.Component {
  static propTypes = {
    incidents: PropTypes.arrayOf(incidentType),
    isVisible: PropTypes.bool.isRequired,
    incidentSelected: PropTypes.func.isRequired,
    toggleIncidentPanel: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.isVisible !== this.props.isVisible || nextProps.incidents !== this.props.incidents
    );
  }

  renderIncidents = incidents =>
    incidents.map(incident => (
      <Incident
        onIncidentSelect={this.props.incidentSelected}
        incident={incident}
        key={incident.id}
      />
    ));

  render() {
    return (
      <React.Fragment>
        <ToggleButton
          onClick={this.props.toggleIncidentPanel}
          className={this.props.isVisible ? 'active' : ''}
          title="Click to toggle the recent events panel"
        >
          Recent Incidents {this.props.isVisible ? '[ - ]' : '[ + ]'}
        </ToggleButton>

        <IncidentPanelWrapper className={this.props.isVisible ? 'show' : ''}>
          <List>{this.renderIncidents(this.props.incidents)}</List>
        </IncidentPanelWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    incidents: recentIncidentsSelector(state),
    isVisible: state.incidentPanel.isVisible,
  };
};

export default connect(mapStateToProps, actionCreators)(IncidentPanel);
