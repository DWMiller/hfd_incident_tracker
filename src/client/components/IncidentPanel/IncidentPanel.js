import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { incidentType } from '../../types';

import IncidentPanelItem from './IncidentPanelItem';
import IncidentPanelTextFilter from './IncidentPanelFilter';

import './IncidentPanel.css';

export class IncidentPanel extends Component {
  static propTypes = {
    incidents: PropTypes.arrayOf(incidentType),
    onIncidentSelect: PropTypes.func.isRequired,
    setActiveIncident: PropTypes.func.isRequired,
    active: PropTypes.string,
    isVisible: PropTypes.bool.isRequired,
    textFilter: PropTypes.string,
  };

  updateFilter = filterText => {
    this.props.setTextFilter(filterText);
  };

  onIncidentHover = incidentId => {
    if (this.props.active !== incidentId) {
      this.props.setActiveIncident(incidentId);
    }
  };

  renderIncidentList = (incidents, filterText) => {
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

  shouldComponentUpdate(nextProps, nextState) {
    //TODO - This seems like a bit much, think on alternatives to skip re-rendering the list
    if (
      nextProps.textFilter !== this.props.textFilter ||
      nextProps.active !== this.props.active ||
      nextProps.incidents.length !== this.props.incidents.length ||
      nextProps.isVisible !== this.props.isVisible
    ) {
      return true;
    }

    return false;
  }

  render() {
    if (!this.props.isVisible) {
      return <div className="incident-panel" />;
    }

    const Incidents = this.renderIncidentList(this.props.incidents, this.props.textFilter);

    return (
      <div className={'incident-panel show'}>
        <IncidentPanelTextFilter
          filterText={this.props.textFilter}
          updateFilter={this.updateFilter}
        />
        <div className="incident-panel-list">{Incidents}</div>
      </div>
    );
  }
}

export default IncidentPanel;
