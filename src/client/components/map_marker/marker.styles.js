import { eventDefinitions } from '../../config/event-definitions';

function style(alert, isActive) {
  const category = alert.category;

  let eventType = eventDefinitions[category];

  if (typeof eventType === 'undefined') {
    eventType = eventDefinitions.UNKNOWN;
  }

  const icon = eventType.icon;

  let eventStyles = {
    backgroundImage: `url(img/${icon.file})`,
    width: icon.width,
    height: icon.height,
    left: -icon.width / 2,
    bottom: 0,
    // top: -iconFile.height / 2,
  };

  if (isActive) {
    eventStyles = Object.assign(eventStyles, {
      height: (eventStyles.height *= 1.1),
      width: (eventStyles.width *= 1.1),
      zIndex: 2,
    });
  }

  return eventStyles;
}

export default style;
