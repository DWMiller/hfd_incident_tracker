import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IncidentTextFilter from './../IncidentTextFilter/IncidentTextFilter';

import FaEye from 'react-icons/lib/fa/eye';
import FaEyeSlash from 'react-icons/lib/fa/eye-slash';

import FaChevronUp from 'react-icons/lib/fa/chevron-up';
import FaChevronDown from 'react-icons/lib/fa/chevron-down';

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
        <div key={key} className={'incident-filter-panel-type ' + (isSelected ? 'selected' : '')}>
          <img onClick={onSelect} alt={'Filter' + icon} src={icons[icon].file} />
          <FaEye
            onClick={!isSelected ? onSelect : null}
            className={'visibility-icon--on' + (isSelected ? ' active' : '')}
            style={{ verticalAlign: 'baseline' }}
          />
          <FaEyeSlash
            onClick={isSelected ? onSelect : null}
            className={'visibility-icon--off' + (!isSelected ? ' active' : '')}
            style={{ verticalAlign: 'baseline' }}
          />
        </div>
      );
    });
  };

  render() {
    return (
      <div className={'incident-filter-panel' + (this.props.isCollapsed ? ' collapsed' : '')}>
        <div onClick={this.props.toggleCollapsed} className="title">
          Filter Incidents
          {this.props.isCollapsed ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        <IncidentTextFilter
          filterText={this.props.textFilter}
          updateFilter={this.updateTextFilter}
        />

        <div className="incident-filter-panel-controls">
          <div />
          <FaEye
            className="incident-filter-panel__control"
            onClick={() => this.selectAll(this.props.availableIncidentTypes)}
          />
          <FaEyeSlash className="incident-filter-panel__control" onClick={this.deselectAll} />
        </div>
        <div className="incident-filter-panel-types">
          {this.renderFilterButtons(this.props.availableIncidentTypes)}
        </div>
      </div>
    );
  }
}

export default IncidentFilter;
