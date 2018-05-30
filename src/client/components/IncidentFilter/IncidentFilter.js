import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IncidentTextFilter from './../IncidentTextFilter/IncidentTextFilter';

import FaEye from 'react-icons/lib/fa/eye';
import FaEyeSlash from 'react-icons/lib/fa/eye-slash';

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
    setTextFilter: PropTypes.func.isRequired,
    textFilter: PropTypes.string,
    isCollapsed: PropTypes.bool.isRequired,
    toggleCollapsed: PropTypes.func.isRequired,
  };

  updateTextFilter = filterText => {
    this.props.setTextFilter(filterText);
  };

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
        <div key={key} className={'incidentFilterPanel__type ' + (isSelected ? 'selected' : '')}>
          <img onClick={onSelect} alt={'Filter' + icon} src={icons[icon].file} />
          <FaEye
            onClick={!isSelected ? onSelect : null}
            className={isSelected ? ' active' : ''}
            style={{ verticalAlign: 'baseline' }}
          />
          <FaEyeSlash
            onClick={isSelected ? onSelect : null}
            className={!isSelected ? ' active' : ''}
            style={{ verticalAlign: 'baseline' }}
          />
        </div>
      );
    });
  };

  render() {
    return (
      <div className={'incidentFilterPanel' + (this.props.isCollapsed ? ' collapsed' : '')}>
        <button onClick={this.props.toggleCollapsed} className="incidentFilterPanel__title">
          Filter Incidents
          {this.props.isCollapsed ? ' [ + ]' : ' [ - ]'}
        </button>

        <div className="incidentFilterPanel__content">
          <IncidentTextFilter
            filterText={this.props.textFilter}
            updateFilter={this.updateTextFilter}
          />

          <div className="incidentFilterPanel__controls">
            <div />
            <span title="Enable visibility of all incident types">
              <FaEye
                className="incidentFilterPanel__control"
                onClick={() => this.selectAll(this.props.availableIncidentTypes)}
              />
            </span>
            <span title="Disable visibility of all incident types">
              <FaEyeSlash className="incidentFilterPanel__control" onClick={this.deselectAll} />
            </span>
          </div>
          <div className="incidentFilterPanel__types">
            {this.renderFilterButtons(this.props.availableIncidentTypes)}
          </div>
        </div>
      </div>
    );
  }
}

export default IncidentFilter;
