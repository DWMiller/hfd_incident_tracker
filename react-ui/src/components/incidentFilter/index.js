import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { toggleFilterCollapse } from '../../redux/ui/filterCollapse';

import {
  deselectAllFilterTypes,
  selectMultipleFilterTypes,
  toggleFilterType,
} from '../../redux/filters/type';

import { setTextFilter } from '../../redux/filters/text';

import { availableIncidentTypesSelector } from '../../redux/selectors';

import IncidentTextFilter from './TextFilter';
import IncidentFilterControls from './Controls';

import { FilterContainer } from './components';

export class IncidentFilter extends React.Component {
  render() {
    return (
      <FilterContainer className={this.props.isCollapsed ? ' collapsed' : ''}>
        <button onClick={this.props.toggleFilterCollapse} className="title">
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
            toggleIncidentFilter={this.props.toggleFilterType}
            selectMultipleIncidentFilters={this.props.selectMultipleFilterTypes}
            deselectAllIncidentFilters={this.props.deselectAllFilterTypes}
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
  toggleFilterCollapse: PropTypes.func.isRequired,
  toggleFilterType: PropTypes.func.isRequired,
  selectMultipleFilterTypes: PropTypes.func.isRequired,
  deselectAllFilterTypes: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    availableIncidentTypes: availableIncidentTypesSelector(state),
    filters: state.filters.types,
    isCollapsed: state.ui.isFilterCollapsed,
    textFilter: state.filters.text,
  };
};

export default connect(mapStateToProps, {
  toggleFilterCollapse,
  deselectAllFilterTypes,
  selectMultipleFilterTypes,
  toggleFilterType,
  setTextFilter,
})(IncidentFilter);
