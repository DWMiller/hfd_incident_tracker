import types from '../config/event-types';

const defaultStyles = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  zIndex: 1,
  boxSizing: 'border-box',
  padding: '5px',
  backgroundPosition: 'center center'
};

function style(alert, isActive) {
  const category = alert.category;

  let eventType = types[category];

  if (typeof eventType === 'undefined') {
    eventType = types.UNKNOWN;
  }

  const icon = eventType.icon;

  let eventStyles = {
    backgroundImage: `url(img/${icon.file})`,
    width: icon.width,
    height: icon.height,
    left: (-icon.width) / 2,
    bottom: 0
    // top: -iconFile.height / 2,
  };

  if (isActive) {
    eventStyles = Object.assign(eventStyles, {
      height: eventStyles.height *= 1.1,
      width: eventStyles.width *= 1.1,
      zIndex: 2
    });
  }

  return Object.assign({}, defaultStyles, eventStyles);
}

export default style;
