import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { incidentType } from '../../types';

import IncidentPanelItem from '../Incident/Incident';
// import IncidentPanelItem from '../IncidentPanelTweet/IncidentPanelTweet';

import './IncidentPanel.css';

export class IncidentPanel extends PureComponent {
  static propTypes = {
    incidents: PropTypes.arrayOf(incidentType),
    onIncidentSelect: PropTypes.func.isRequired,
    active: PropTypes.string,
    isVisible: PropTypes.bool.isRequired,
    toggleIncidentPanel: PropTypes.func.isRequired,
  };

  renderIncidentList = incidents =>
    incidents.map(incident => (
      <IncidentPanelItem
        onIncidentSelect={this.props.onIncidentSelect}
        incident={incident}
        key={incident.id}
      />
    ));

  render() {
    const Incidents = this.renderIncidentList(this.props.incidents);

    return (
      <React.Fragment>
        <button
          onClick={this.props.toggleIncidentPanel}
          className={'incident-panel-toggle ' + (this.props.isVisible ? 'active' : '')}
          title="Click to toggle the recent events panel"
        >
          Twitter Feed {this.props.isVisible ? '[ - ]' : '[ + ]'}
        </button>

        <div className={'incident-panel ' + (this.props.isVisible ? 'show' : '')}>
          <div className="incident-panel-list">
            <ReactCSSTransitionGroup
              transitionName="incident"
              transitionEnterTimeout={2000}
              transitionLeave={false}
            >
              {Incidents}
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default IncidentPanel;
