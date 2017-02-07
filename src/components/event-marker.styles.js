import types from '../config/event-types';

const styles = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat'
};

function style(category) {
  let eventType = types[category];

  if (typeof eventType === 'undefined') {
    eventType = types.UNKNOWN;
  }

  const icon = eventType.icon;

  return Object.assign({}, styles, {
    backgroundImage: `url(img/${icon.file})`,
    width: icon.width,
    height: icon.height,
    left: (-icon.width) / 2,
    bottom: 0
    // top: -iconFile.height / 2,
  });
}

export default style;
