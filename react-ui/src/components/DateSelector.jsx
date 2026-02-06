import Slider from 'rc-slider';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, subHours, startOfHour } from 'date-fns';
import styled from 'styled-components';

import { setDateRange } from '../store/modules/incidentFilter/date';

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
  width: 350px;
  background: white;
  padding: 16px 20px;
  border-radius: 5px;
  box-shadow: ${props => props.theme.shadows['shadow-200']};
`;

const Label = styled.p`
  margin: 8px 0 4px;
  text-align: center;
  font-size: 14px;
`;

const Presets = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
  margin-top: 8px;
`;

const PresetButton = styled.button`
  padding: 4px 12px;
  border-radius: 4px;
  border: 1px solid ${props => (props.$active ? '#1976d2' : '#ccc')};
  background: ${props => (props.$active ? '#1976d2' : 'white')};
  color: ${props => (props.$active ? 'white' : '#333')};
  cursor: pointer;
  font-size: 12px;
  &:hover {
    background: ${props => (props.$active ? '#1565c0' : '#f5f5f5')};
  }
`;

const PRESETS = [
  { label: '2 days', hours: 48 },
  { label: '3 days', hours: 72 },
  { label: '1 week', hours: 168 },
];

function formatTime(hoursAgo) {
  if (hoursAgo === 0) return 'now';
  // Align to clock hours: at 7:34, hoursAgo=1 → 7 PM, hoursAgo=2 → 6 PM
  const date = subHours(startOfHour(new Date()), hoursAgo - 1);
  return format(date, 'EEE h a');
}

function DateSelector() {
  const dispatch = useDispatch();
  const min = useSelector(state => state.incidentFilter.date.min);
  const max = useSelector(state => state.incidentFilter.date.max);

  const presetActive = min === 0 && max > 24;

  // Slider: position 0 = 24h ago, position 24 = now
  // Convert: sliderPos = 24 - hoursAgo
  const sliderValue = presetActive ? [0, 24] : [24 - max, 24 - min];

  const onSliderChange = ([left, right]) => {
    const newMax = Math.max(24 - left, 1);
    const newMin = 24 - right;
    // Ensure at least 1 hour range
    if (newMax - newMin < 1) return;
    dispatch(setDateRange({ min: newMin, max: newMax }));
  };

  const onPreset = (hours) => {
    dispatch(setDateRange({ min: 0, max: hours }));
  };

  let label;
  if (presetActive) {
    const preset = PRESETS.find(p => p.hours === max);
    label = preset ? `Last ${preset.label}` : `Last ${max} hours`;
  } else if (min === 0 && max === 24) {
    label = 'Last 24 hours';
  } else if (min === 0) {
    label = `${formatTime(max)} \u2013 now`;
  } else {
    label = `${formatTime(max)} \u2013 ${formatTime(min)}`;
  }

  return (
    <FloatingWrapper>
      <Container>
        <Slider
          range
          value={sliderValue}
          onChange={onSliderChange}
          min={0}
          max={24}
          allowCross={false}
        />
        <Label>{label}</Label>
        <Presets>
          {PRESETS.map(p => (
            <PresetButton
              key={p.hours}
              $active={min === 0 && max === p.hours}
              onClick={() => onPreset(p.hours)}
            >
              {p.label}
            </PresetButton>
          ))}
        </Presets>
      </Container>
    </FloatingWrapper>
  );
}

export default DateSelector;
