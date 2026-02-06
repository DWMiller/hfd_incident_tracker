import medical from '../assets/icons/medical.png';
import fire from '../assets/icons/fire.png';
import fireTruck from '../assets/icons/fire-truck.png';
import alarm from '../assets/icons/alarm.png';
import carFire from '../assets/icons/car-fire.png';
import question from '../assets/icons/question.png';
import electrical from '../assets/icons/electrical.png';
import accident from '../assets/icons/accident.png';
import flooding from '../assets/icons/flooding.png';
import biohazard from '../assets/icons/biohazard.png';

const icons = {
  MEDICAL: {
    file: medical,
    width: 20,
    height: 20,
  },
  FIRE: {
    file: fire,
    width: 24,
    height: 24,
  },
  FIRE_TRUCK: {
    file: fireTruck,
    width: 24,
    height: 25,
  },
  ALARM: {
    file: alarm,
    width: 24,
    height: 20,
  },
  CAR_FIRE: {
    file: carFire,
    width: 24,
    height: 35,
  },
  UNKNOWN: {
    file: question,
    width: 20,
    height: 20,
  },
  ELECTRICAL: {
    file: electrical,
    width: 20,
    height: 26,
  },
  ACCIDENT: {
    file: accident,
    width: 30,
    height: 25,
  },
  FLOODING: {
    file: flooding,
    width: 36,
    height: 36,
  },
  BIOHAZARD: {
    file: biohazard,
    width: 36,
    height: 34,
  },
};

export default icons;
