import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';

import { MdClose } from 'react-icons/md';

import styled from 'styled-components';

const TextFilterWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 35px;
  margin: 0 0 0.5em 0;

  .incidentTextFilter__input {
    font-variant: small-caps;
    padding: 6px 12px;
    line-height: 1.42857143;
    color: #555;
  }
`;

export default class IncidentTextFilter extends PureComponent {
  static propTypes = {
    filterText: PropTypes.string,
    updateFilter: PropTypes.func.isRequired,
  };

  handleChange = event => {
    this.props.updateFilter(event.target.value);
  };

  clearFilter = () => {
    this.props.updateFilter('');
  };

  render() {
    return (
      <TextFilterWrapper>
        <DebounceInput
          minLength={1}
          debounceTimeout={500}
          className="incidentTextFilter__input"
          placeholder="Search incidents"
          onChange={this.handleChange}
          value={this.props.filterText}
        />
        <button onClick={this.clearFilter}>
          <MdClose />
        </button>
      </TextFilterWrapper>
    );
  }
}
