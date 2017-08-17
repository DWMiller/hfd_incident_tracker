import React, { Component } from 'react';
import PropTypes from 'prop-types';

import eventTypes from '../../config/event-types';
import './event-filter.css';

export class EventFilter extends Component {
  /**
 * Returns an object containing the present event types only
 * object keys are the type icons
 */
  getEventTypes(events = []) {
    return Object.keys(
      events.reduce((accumulator, event) => {
        const type = eventTypes[event.category]
          ? eventTypes[event.category]
          : eventTypes.UNKNOWN;
        return Object.assign({}, accumulator, { [type.icon.file]: true });
      }, {})
    );
  }

  onSelect = type => {
    this.props.store.dispatch({ type: 'TOGGLE_EVENT_FILTER', category: type });
  };

  selectAll = types => {
    this.props.store.dispatch({ type: 'SELECT_ALL', category: types });
  };

  deselectAll = () => {
    this.props.store.dispatch({ type: 'DESELECT_ALL' });
  };

  renderFilterButtons = (types, filter) => {
    return types.map((icon, key) => {
      const isSelected = this.props.filter.some(f => f === icon);
      const onSelect = () => this.onSelect(icon);

      return (
        <div
          key={key}
          onClick={onSelect}
          className={
            'event-filter-panel-type ' + (isSelected ? 'selected' : '')
          }
        >
          <img alt={'Filter' + icon} src={'img/' + icon} />
        </div>
      );
    });
  };

  render() {
    const { events } = this.props;
    const types = this.getEventTypes(events);

    return (
      <div className={'event-filter-panel'}>
        {this.renderFilterButtons(types)}
        <button
          onClick={() => this.selectAll(types)}
          className={'event-filter-panel-type'}
        >
          All
        </button>
        <button
          onClick={this.deselectAll}
          className={'event-filter-panel-type'}
        >
          None
        </button>
      </div>
    );
  }

  static propTypes = {
    filter: PropTypes.arrayOf(PropTypes.string),
    events: PropTypes.arrayOf(
      PropTypes.shape({
        category: PropTypes.string.isRequired,
      })
    ),
  };
}

export default EventFilter;
