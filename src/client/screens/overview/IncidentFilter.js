import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'client/redux/actionCreators';

import { availableIncidentTypesSelector } from 'client/redux/selectors';

import IncidentTextFilter from './incidentFilter/TextFilter';
import IncidentFilterControls from './incidentFilter/Controls';

import { FilterContainer } from './incidentFilter/components';

export class IncidentFilter extends Component {
  render() {
    return (
      <FilterContainer className={this.props.isCollapsed ? ' collapsed' : ''}>
        <button onClick={this.props.toggleFilterPanel} className="title">
          Filter Incidents
          {this.props.isCollapsed ? ' [ + ]' : ' [ - ]'}
        </button>

        <div className="content">
          <IncidentTextFilter
            filterText={this.props.textFilter}
            updateFilter={this.props.setTextFilter}
          />

          <IncidentFilterControls
            filters={this.props.filters}
            availableIncidentTypes={this.props.availableIncidentTypes}
            toggleIncidentFilter={this.props.toggleIncidentFilter}
            selectMultipleIncidentFilters={this.props.selectMultipleIncidentFilters}
            deselectAllIncidentFilters={this.props.deselectAllIncidentFilters}
          />
        </div>
      </FilterContainer>
    );
  }
}

IncidentFilter.propTypes = {
  availableIncidentTypes: PropTypes.arrayOf(PropTypes.string),
  filters: PropTypes.arrayOf(PropTypes.string),
  textFilter: PropTypes.string,
  isCollapsed: PropTypes.bool.isRequired,
  setTextFilter: PropTypes.func.isRequired,
  toggleFilterPanel: PropTypes.func.isRequired,
  toggleIncidentFilter: PropTypes.func.isRequired,
  selectMultipleIncidentFilters: PropTypes.func.isRequired,
  deselectAllIncidentFilters: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    availableIncidentTypes: availableIncidentTypesSelector(state),
    filters: state.filters.types,
    isCollapsed: state.filters.isCollapsed,
    textFilter: state.filters.text,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IncidentFilter);
