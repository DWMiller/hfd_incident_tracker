import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import FaClose from 'react-icons/lib/fa/close';

import './IncidentTextFilter.css';

export default class IncidentTextFilter extends PureComponent {
  static propTypes = {
    filterText: PropTypes.string,
    updateFilter: PropTypes.func.isRequired,
  };

  handleChange = event => {
    this.props.updateFilter(event.currentTarget.value);
  };

  clearFilter = () => {
    this.props.updateFilter('');
  };

  render() {
    return (
      <React.Fragment>
        <input
          className="incident__text-filter"
          placeholder="Search incidents"
          onChange={this.handleChange}
          value={this.props.filterText}
        />
        <button onClick={this.clearFilter}>
          <FaClose />
        </button>
      </React.Fragment>
    );
  }
}
