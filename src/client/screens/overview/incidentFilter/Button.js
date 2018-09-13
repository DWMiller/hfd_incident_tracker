import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import icons from 'client/config/icons';

class IncidentFilterButton extends PureComponent {
  onSelect = () => this.props.toggleIncidentFilter(this.props.icon);

  render() {
    const { icon, isSelected, className, toggleIncidentFilter, ...props } = this.props;

    return (
      <div
        className={`${className} incidentFilterPanel__type ' + ${isSelected ? 'selected' : ''}`}
        {...props}
      >
        <img onClick={this.onSelect} alt={'Filter ' + icon} src={icons[icon].file} />
        <FaEye
          onClick={!isSelected ? this.onSelect : null}
          className={isSelected ? ' active' : ''}
          style={{ verticalAlign: 'baseline' }}
        />
        <FaEyeSlash
          onClick={isSelected ? this.onSelect : null}
          className={!isSelected ? ' active' : ''}
          style={{ verticalAlign: 'baseline' }}
        />
      </div>
    );
  }
}

IncidentFilterButton.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  icon: PropTypes.string,
  toggleIncidentFilter: PropTypes.func.isRequired,
};

export default IncidentFilterButton;
