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
  bottom: 36px;
  right: 10px;
`;

const Container = styled.div`
  width: 350px;
  background: white;
  padding: 16px 20px;
  border-radius: 14px;
  box-shadow: ${props => props.theme.shadows['shadow-200']};

  .rc-slider-handle {
    width: 16px;
    height: 16px;
    margin-top: -6px;
    background-color: #1976d2;
    border: none;
    opacity: 1;
    &:hover,
    &:active,
    &:focus {
      box-shadow: 0 0 0 4px rgba(25, 118, 210, 0.2);
    }
  }
  .rc-slider-track {
    background-color: #bdbdbd;
  }
  .rc-slider-rail {
    background-color: #e0e0e0;
  }
`;

const Label = styled.p`
  margin: 8px 0 4px;
  text-align: center;
  font-size: 14px;
`;

const Presets = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 10px;
`;

const PresetButton = styled.button`
  padding: 6px 16px;
  border-radius: 20px;
  border: none;
  background: ${props => (props.$active ? '#1976d2' : '#f0f0f0')};
  color: ${props => (props.$active ? 'white' : '#888')};
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  &:hover {
    background: ${props => (props.$active ? '#1565c0' : '#e0e0e0')};
  }
`;

const PRESETS = [
  { label: '24h', hours: 24 },
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

  const presetActive = min === 0 && PRESETS.some(p => p.hours === max);

  // Slider: position 0 = 24h ago, position 24 = now
  // Convert: sliderPos = 24 - hoursAgo
  const sliderValue = presetActive && max > 24 ? [0, 24] : [24 - max, 24 - min];

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
    label = <>Showing last <strong>{preset.label}</strong></>;
  } else if (min === 0) {
    label = <>Showing <strong>{formatTime(max)} – now</strong></>;
  } else {
    label = <>Showing <strong>{formatTime(max)} – {formatTime(min)}</strong></>;
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
