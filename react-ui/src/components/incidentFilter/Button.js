import React from 'react';
import PropTypes from 'prop-types';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import icons from '../../config/icons';

function IncidentFilterButton(props) {
  const onSelect = () => props.toggleIncidentFilter(props.icon);

  const { icon, isSelected, className, toggleIncidentFilter, ...rest } = props;

  return (
    <div
      className={`${className} incidentFilterPanel__type ' + ${isSelected ? 'selected' : ''}`}
      {...rest}
    >
      <img onClick={onSelect} alt={'Filter ' + icon} src={icons[icon].file} />
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
}

IncidentFilterButton.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  icon: PropTypes.string,
  toggleIncidentFilter: PropTypes.func.isRequired,
};

export default IncidentFilterButton;
