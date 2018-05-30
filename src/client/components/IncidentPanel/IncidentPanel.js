import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../redux/actionCreators';
import { incidentType } from '../../types';

import { recentIncidentsSelector } from '../../redux/selectors';

import IncidentList from '../IncidentList/IncidentList';

import './IncidentPanel.css';

export class IncidentPanel extends Component {
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

  render() {
    return (
      <React.Fragment>
        <button
          onClick={this.props.toggleIncidentPanel}
          className={'incident-panel-toggle ' + (this.props.isVisible ? 'active' : '')}
          title="Click to toggle the recent events panel"
        >
          Recent Incidents {this.props.isVisible ? '[ - ]' : '[ + ]'}
        </button>
        <div className={'incident-panel ' + (this.props.isVisible ? 'show' : '')}>
          <IncidentList
            onIncidentSelect={this.props.incidentSelected}
            incidents={this.props.incidents}
          />
        </div>
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(IncidentPanel);
