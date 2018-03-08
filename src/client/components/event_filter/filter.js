import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { eventType, filterType } from '../../types';

import { eventDefinitions } from '../../config/event-definitions';
import './event-filter.css';

export class EventFilter extends Component {
  static propTypes = {
    filter: filterType,
    events: PropTypes.arrayOf(eventType),
    toggleEventFilter: PropTypes.func.isRequired,
    deselectAllEventFilters: PropTypes.func.isRequired,
    selectMultipleEventFilters: PropTypes.func.isRequired,
  };

  /**
   * Returns an object containing the present event types only
   * object keys are the type icons
   */
  getEventDefinitions(events = []) {
    return Object.keys(
      events.reduce((accumulator, event) => {
        const type = eventDefinitions[event.category]
          ? eventDefinitions[event.category]
          : eventDefinitions.UNKNOWN;
        return Object.assign({}, accumulator, { [type.icon.file]: true });
      }, {})
    );
  }

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
          <img alt={'Filter' + icon} src={'img/' + icon} />
        </div>
      );
    });
  };

  render() {
    const { events } = this.props;
    const types = this.getEventDefinitions(events);

    return (
      <div className={'event-filter-panel'}>
        {this.renderFilterButtons(types)}
        <button onClick={() => this.selectAll(types)} className={'event-filter-panel-type'}>
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
