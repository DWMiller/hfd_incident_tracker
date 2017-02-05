const typeIcons = {
  MEDICAL: {
    file: 'medical.png',
    width: 25,
    height: 25
  },
  FIRE: {
    file: 'fire2.png',
    width: 24,
    height: 35
  },
  ALARM: {
    file: 'alarm.png',
    width: 24,
    height: 35
  },
  'VEHICLE FIRE': {
    file: 'car-fire.png',
    width: 24,
    height: 35
  },
  UNKNOWN: {
    file: 'question.png',
    width: 24,
    height: 35
  },
  'ELECTRICAL PROBLEM': {
    file: 'electrical.png',
    width: 24,
    height: 35
  },
  'VEHICLE ACC': {
    file: 'accident.png',
    width: 24,
    height: 35
  },
  FLOODING: {
    file: 'flooding.png',
    width: 36,
    height: 36
  }
};

typeIcons['BURN COMPLAINT'] = typeIcons.MEDICAL;
typeIcons['SMOKE DETECTOR'] = typeIcons.FIRE;
typeIcons.SMOKE = typeIcons.FIRE;
typeIcons['GRASS FIRE'] = typeIcons.FIRE;
typeIcons['UNKNOWN FIRE'] = typeIcons.FIRE;
typeIcons['STRUCTURE FIRE'] = typeIcons.FIRE;
typeIcons['RUBBISH FIRE'] = typeIcons.FIRE;
typeIcons['APPLIANCE FIRE'] = typeIcons.FIRE;
typeIcons['ALARM CONDITIONS'] = typeIcons.ALARM;
typeIcons['NATURAL GAS'] = typeIcons.ALARM;
typeIcons['CO DETECTOR'] = typeIcons.ALARM;
typeIcons['MULTIPLE ALARM'] = typeIcons.ALARM;
typeIcons['FLOODING'] = typeIcons.FLOODING;
// typeIcons[''] = typeIcons[''];
// WATER RESCUE
// 'FIRE OUT'
//  'FD ASSISTANCE'
// 'PROPANE LEAK':
// 'ODOURS' : ''
// ROPE RESCUE

const styles = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat'
};

function style(category) {
  let iconFile = typeIcons[category];

  if (typeof iconFile === 'undefined') {
    iconFile = typeIcons.UNKNOWN;
  }

  const icon = {
    backgroundImage: `url(img/${iconFile.file})`,
    width: iconFile.width,
    height: iconFile.height,
    left: (-iconFile.width) / 2,
    bottom: 0
    // top: -iconFile.height / 2,
  };

  return Object.assign({}, styles, icon);
}

export default style;
