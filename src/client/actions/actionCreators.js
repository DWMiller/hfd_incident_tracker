export function addEvent(event) {
  return {
    type: 'ADD_EVENT',
    event,
  };
}

export function addEvents(events) {
  return {
    type: 'ADD_EVENTS',
    events,
  };
}

export function clearEvents() {
  return {
    type: 'CLEAR_EVENTS',
  };
}

export function setActiveEvent(eventId) {
  return {
    type: 'SET_ACTIVE_EVENT',
    eventId,
  };
}

export function mapChange(settings) {
  return {
    type: 'MAP_CHANGE',
    settings,
  };
}

export function toggleEventPanel() {
  return {
    type: 'TOGGLE_EVENT_PANEL',
  };
}

export function toggleEventFilter(category) {
  return {
    type: 'TOGGLE_EVENT_FILTER',
    category,
  };
}

export function selectMultipleEventFilters(category) {
  return {
    type: 'SELECT_MULTIPLE',
    category,
  };
}

export function deselectAllEventFilters() {
  return {
    type: 'DESELECT_ALL',
  };
}

export function setTextFilter(text) {
  return {
    type: 'SET_TEXT_FILTER',
    text,
  };
}
