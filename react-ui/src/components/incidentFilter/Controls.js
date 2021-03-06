import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import IncidentFilterButton from './Button';

class IncidentFilterControls extends Component {
  selectAll = () => this.props.selectMultipleIncidentFilters(this.props.availableIncidentTypes);

  shouldComponentUpdate(nextProps) {
    return !(
      this.props.filters === nextProps.filters &&
      this.props.availableIncidentTypes === nextProps.availableIncidentTypes
    );
  }

  renderIncidentButton(types) {
    return types.map(icon => (
      <IncidentFilterButton
        key={icon}
        isSelected={this.props.filters.some(f => f === icon)}
        icon={icon}
        toggleIncidentFilter={this.props.toggleIncidentFilter}
      />
    ));
  }

  render() {
    const {
      deselectAllIncidentFilters,
      availableIncidentTypes,
      toggleIncidentFilter,
      selectMultipleIncidentFilters,
      ...props
    } = this.props;

    return (
      <div {...props}>
        <div className="incidentFilterPanel__controls">
          <div />
          <span title="Enable visibility of all incident types">
            <FaEye className="incidentFilterPanel__control" onClick={this.selectAll} />
          </span>
          <span title="Disable visibility of all incident types">
            <FaEyeSlash
              className="incidentFilterPanel__control"
              onClick={deselectAllIncidentFilters}
            />
          </span>
        </div>

        <div className="incidentFilterPanel__types">
          {this.renderIncidentButton(availableIncidentTypes)}
        </div>
      </div>
    );
  }
}

IncidentFilterControls.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string),
  availableIncidentTypes: PropTypes.arrayOf(PropTypes.string),
  toggleIncidentFilter: PropTypes.func.isRequired,
  deselectAllIncidentFilters: PropTypes.func.isRequired,
  selectMultipleIncidentFilters: PropTypes.func.isRequired,
};

export default IncidentFilterControls;
