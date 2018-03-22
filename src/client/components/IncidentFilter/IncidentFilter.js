import React, { Component } from 'react';
import PropTypes from 'prop-types';

import icons from '../../config/icons';

import { filterType } from '../../types';

import './IncidentFilter.css';

export class IncidentFilter extends Component {
  static propTypes = {
    filter: filterType,
    toggleIncidentFilter: PropTypes.func.isRequired,
    deselectAllIncidentFilters: PropTypes.func.isRequired,
    selectMultipleIncidentFilters: PropTypes.func.isRequired,
    availableIncidentTypes: PropTypes.arrayOf(PropTypes.string),
  };

  /**
   * Returns an object containing the present incident types only
   * object keys are the type icons
   */

  onSelect = type => {
    this.props.toggleIncidentFilter(type);
  };

  selectAll = types => {
    this.props.selectMultipleIncidentFilters(types);
  };

  deselectAll = () => {
    this.props.deselectAllIncidentFilters();
  };

  renderFilterButtons = (types, filter) => {
    return types.map((icon, key) => {
      const isSelected = this.props.filter.some(f => f === icon);
      const onSelect = () => this.onSelect(icon);

      return (
        <div
          key={key}
          onClick={onSelect}
          className={'incident-filter-panel-type ' + (isSelected ? 'selected' : '')}
        >
          <img alt={'Filter' + icon} src={icons[icon].file} />
        </div>
      );
    });
  };

  render() {
    return (
      <div className={'incident-filter-panel'}>
        {this.renderFilterButtons(this.props.availableIncidentTypes)}
        <button
          onClick={() => this.selectAll(this.props.availableIncidentTypes)}
          className={'incident-filter-panel-type'}
        >
          All
        </button>
        <button onClick={this.deselectAll} className={'incident-filter-panel-type'}>
          None
        </button>
      </div>
    );
  }
}

export default IncidentFilter;
