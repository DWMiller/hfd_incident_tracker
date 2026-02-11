import React from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import icons from '../../config/icons';
import { TypeRowWrapper, IconSquare, TypeInfo, TypeLabel, ActiveCount, EyeToggle } from './components';

function IncidentFilterButton({ icon, isSelected, toggleIncidentFilter, count }) {
  const onToggle = () => toggleIncidentFilter(icon);
  const iconConfig = icons[icon];

  return (
    <TypeRowWrapper onClick={onToggle}>
      <IconSquare $color={iconConfig.color}>
        <img alt={iconConfig.label} src={iconConfig.file} />
      </IconSquare>
      <TypeInfo>
        <TypeLabel>{iconConfig.label}</TypeLabel>
        <ActiveCount>{count || 0} active</ActiveCount>
      </TypeInfo>
      <EyeToggle $visible={isSelected}>
        {isSelected ? <FaEye /> : <FaEyeSlash />}
      </EyeToggle>
    </TypeRowWrapper>
  );
}

IncidentFilterButton.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
  toggleIncidentFilter: PropTypes.func.isRequired,
  count: PropTypes.number,
};

export default IncidentFilterButton;
