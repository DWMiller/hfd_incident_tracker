import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { incidentType } from '../../types';
import Incident from '../Incident/Incident';

class IncidentList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.incidents !== this.props.incidents;
  }

  renderIncidents = incidents =>
    incidents.map(incident => (
      <Incident
        onIncidentSelect={this.props.onIncidentSelect}
        incident={incident}
        key={incident.id}
      />
    ));

  render() {
    return (
      <div className="incident-panel-list">
        <ReactCSSTransitionGroup
          transitionName="incident"
          transitionEnterTimeout={2000}
          transitionLeave={false}
        >
          {this.renderIncidents(this.props.incidents)}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

IncidentList.propTypes = {
  incidents: PropTypes.arrayOf(incidentType),
  onIncidentSelect: PropTypes.func.isRequired,
};

export default IncidentList;
