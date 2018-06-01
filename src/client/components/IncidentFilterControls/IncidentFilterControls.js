import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

import FaEye from 'react-icons/lib/fa/eye';
import FaEyeSlash from 'react-icons/lib/fa/eye-slash';

import IncidentFilterButton from '../IncidentFilterButton/IncidentFilterButton';

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
    return (
      <Fragment>
        <div className="incidentFilterPanel__controls">
          <div />
          <span title="Enable visibility of all incident types">
            <FaEye className="incidentFilterPanel__control" onClick={this.selectAll} />
          </span>
          <span title="Disable visibility of all incident types">
            <FaEyeSlash
              className="incidentFilterPanel__control"
              onClick={this.props.deselectAllIncidentFilters}
            />
          </span>
        </div>

        <div className="incidentFilterPanel__types">
          {this.renderIncidentButton(this.props.availableIncidentTypes)}
        </div>
      </Fragment>
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
