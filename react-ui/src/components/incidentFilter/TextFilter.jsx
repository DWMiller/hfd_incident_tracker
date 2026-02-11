import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import { MdSearch, MdClose } from 'react-icons/md';
import styled from 'styled-components';

const TextFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 16px 12px;
  background: ${props => props.theme.palette['grey-050']};
  border-radius: 20px;
  padding: 0 12px;
  gap: 8px;

  svg {
    color: ${props => props.theme.palette['grey-400']};
    font-size: 18px;
    min-width: 18px;
  }

  input {
    flex: 1;
    border: none;
    background: none;
    padding: 8px 0;
    font-size: ${props => props.theme.typeScale.small};
    color: ${props => props.theme.palette['grey-800']};
    outline: none;

    &::placeholder {
      color: ${props => props.theme.palette['grey-400']};
    }
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    color: ${props => props.theme.palette['grey-400']};

    &:hover {
      color: ${props => props.theme.palette['grey-600']};
    }
  }
`;

function IncidentTextFilter({ filterText, updateFilter }) {
  const handleChange = event => updateFilter(event.target.value);
  const clearFilter = () => updateFilter('');

  return (
    <TextFilterWrapper>
      <MdSearch />
      <DebounceInput
        minLength={1}
        debounceTimeout={500}
        placeholder="Search incidents"
        onChange={handleChange}
        value={filterText}
      />
      {filterText && (
        <button onClick={clearFilter}>
          <MdClose />
        </button>
      )}
    </TextFilterWrapper>
  );
}

IncidentTextFilter.propTypes = {
  filterText: PropTypes.string,
  updateFilter: PropTypes.func.isRequired,
};

export default IncidentTextFilter;
