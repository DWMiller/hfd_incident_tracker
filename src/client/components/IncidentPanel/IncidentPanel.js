import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { incidentType } from '../../types';

import IncidentPanelItem from './IncidentPanelItem';

import './IncidentPanel.css';

export class IncidentPanel extends PureComponent {
  static propTypes = {
    incidents: PropTypes.arrayOf(incidentType),
    onIncidentSelect: PropTypes.func.isRequired,
    setActiveIncident: PropTypes.func.isRequired,
    active: PropTypes.string,
    isVisible: PropTypes.bool.isRequired,
    toggleIncidentPanel: PropTypes.func.isRequired,
  };

  onIncidentHover = incidentId => {
    if (this.props.active !== incidentId) {
      this.props.setActiveIncident(incidentId);
    }
  };

  renderIncidentList = incidents => {
    const renderedIncidents = incidents.map(incident => {
      const isActive = incident.id === this.props.active;

      return (
        <IncidentPanelItem
          onIncidentHover={this.onIncidentHover}
          onIncidentSelect={this.props.onIncidentSelect}
          isActive={isActive}
          incident={incident}
          key={incident._id}
        />
      );
    });

    return renderedIncidents;
  };

  render() {
    const Incidents = this.renderIncidentList(this.props.incidents);

    return (
      <React.Fragment>
        <button
          onClick={this.props.toggleIncidentPanel}
          className={'incident-panel-toggle ' + (this.props.isVisible ? 'active' : '')}
          title="Click to toggle the recent events panel"
        >
          Recent {this.props.isVisible ? '[ - ]' : '[ + ]'}
        </button>

        <div className={'incident-panel ' + (this.props.isVisible ? 'show' : '')}>
          <div className="incident-panel-list">{Incidents}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default IncidentPanel;
