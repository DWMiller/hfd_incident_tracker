import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './IncidentPanelFilter.css';

export default class IncidentPanelTextFilter extends PureComponent {
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
          className="incident-panel__text-filter"
          placeholder="Filter incidents"
          onChange={this.handleChange}
          value={this.props.filterText}
        />
        <button onClick={this.clearFilter}>Clear</button>
      </React.Fragment>
    );
  }
}
