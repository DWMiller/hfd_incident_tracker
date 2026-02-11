import medicalIcon from '../assets/icons/medical.svg';
import fireIcon from '../assets/icons/fire.svg';
import fireTruckIcon from '../assets/icons/fire-truck.svg';
import alarmIcon from '../assets/icons/alarm.svg';
import carFireIcon from '../assets/icons/car-fire.svg';
import questionIcon from '../assets/icons/question.svg';
import electricalIcon from '../assets/icons/electrical.svg';
import accidentIcon from '../assets/icons/accident.svg';
import floodingIcon from '../assets/icons/flooding.svg';
import biohazardIcon from '../assets/icons/biohazard.svg';

const icons = {
  MEDICAL: {
    file: medicalIcon,
    width: 36,
    height: 36,
    color: '#16A34A',
    label: 'Medical',
  },
  FIRE: {
    file: fireIcon,
    width: 36,
    height: 36,
    color: '#DC2626',
    label: 'Fire',
  },
  FIRE_TRUCK: {
    file: fireTruckIcon,
    width: 36,
    height: 36,
    color: '#EA580C',
    label: 'Rescue',
  },
  ALARM: {
    file: alarmIcon,
    width: 36,
    height: 36,
    color: '#475569',
    label: 'Alarm',
  },
  CAR_FIRE: {
    file: carFireIcon,
    width: 36,
    height: 36,
    color: '#B91C1C',
    label: 'Vehicle Fire',
  },
  UNKNOWN: {
    file: questionIcon,
    width: 36,
    height: 36,
    color: '#6B7280',
    label: 'Other',
  },
  ELECTRICAL: {
    file: electricalIcon,
    width: 36,
    height: 36,
    color: '#D97706',
    label: 'Electrical',
  },
  ACCIDENT: {
    file: accidentIcon,
    width: 36,
    height: 36,
    color: '#0891B2',
    label: 'Motor Vehicle',
  },
  FLOODING: {
    file: floodingIcon,
    width: 36,
    height: 36,
    color: '#2563EB',
    label: 'Flooding',
  },
  BIOHAZARD: {
    file: biohazardIcon,
    width: 36,
    height: 36,
    color: '#7C3AED',
    label: 'Hazmat',
  },
};

export default icons;
