import { Range } from 'rc-slider';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { setDateRange } from 'store/modules/incidentFilter/date';

import 'rc-slider/assets/index.css';

const FloatingWrapper = styled.div`
  position: absolute;
  z-index: 2000;
  width: 100%;
  bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 325px;
  background: white;
  padding: 20px 20px 0 20px;
  border-radius: 5px;
  box-shadow: ${props => props.theme.shadows['shadow-200']};
`;

const sliderOptions = {
  min: 0,
  max: 24,
  step: 1,
  pushable: true,
  allowCross: false,
};

function getLabel(min = 0, max = 24) {
  if (max === 24) {
    const hours = 24 - min;

    if (hours === 1) {
      return 'Last hour';
    }

    return `Last ${hours} hours`;
  }

  return `${24 - max} to ${24 - min} hours ago.`;
}

function DateSelector() {
  const dispatch = useDispatch();

  const min = useSelector(state => state.incidentFilter.date.min);
  const max = useSelector(state => state.incidentFilter.date.max);

  const [label, setLabel] = React.useState(getLabel(min, max));

  const onChange = ([min, max]) => {
    setLabel(getLabel(min, max)); // We do this here because the redux dispatch is debounced

    dispatch(
      setDateRange({
        min,
        max,
      })
    );
  };

  return (
    <FloatingWrapper>
      <Container>
        <Range defaultValue={[min, max]} onChange={onChange} {...sliderOptions} />
        <p>{label}</p>
      </Container>
    </FloatingWrapper>
  );
}

export default DateSelector;
