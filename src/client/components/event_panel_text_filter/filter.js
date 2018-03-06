import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

export default class EventPanelTextFilter extends PureComponent {
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
          className="event-panel__text-filter"
          placeholder="Filter events"
          onChange={this.handleChange}
          value={this.props.filterText}
        />
        <button onClick={this.clearFilter}>Clear</button>
      </React.Fragment>
    );
  }
}
