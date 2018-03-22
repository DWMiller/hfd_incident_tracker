import React, { Component } from 'react';
import PropTypes from 'prop-types';

import icons from '../../config/icons';

import { filterType } from '../../types';

import './event-filter.css';

export class EventFilter extends Component {
  static propTypes = {
    filter: filterType,
    toggleEventFilter: PropTypes.func.isRequired,
    deselectAllEventFilters: PropTypes.func.isRequired,
    selectMultipleEventFilters: PropTypes.func.isRequired,
    availableEventTypes: PropTypes.arrayOf(PropTypes.string),
  };

  /**
   * Returns an object containing the present event types only
   * object keys are the type icons
   */

  onSelect = type => {
    this.props.toggleEventFilter(type);
  };

  selectAll = types => {
    this.props.selectMultipleEventFilters(types);
  };

  deselectAll = () => {
    this.props.deselectAllEventFilters();
  };

  renderFilterButtons = (types, filter) => {
    return types.map((icon, key) => {
      const isSelected = this.props.filter.some(f => f === icon);
      const onSelect = () => this.onSelect(icon);

      return (
        <div
          key={key}
          onClick={onSelect}
          className={'event-filter-panel-type ' + (isSelected ? 'selected' : '')}
        >
          <img alt={'Filter' + icon} src={icons[icon].file} />
        </div>
      );
    });
  };

  render() {
    return (
      <div className={'event-filter-panel'}>
        {this.renderFilterButtons(this.props.availableEventTypes)}
        <button
          onClick={() => this.selectAll(this.props.availableEventTypes)}
          className={'event-filter-panel-type'}
        >
          All
        </button>
        <button onClick={this.deselectAll} className={'event-filter-panel-type'}>
          None
        </button>
      </div>
    );
  }
}

export default EventFilter;
