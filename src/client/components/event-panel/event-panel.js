import React from 'react';
import PropTypes from 'prop-types';

import EventItem from './event-panel-item';
import PanelToggle from './event-panel-toggle';

import store from '../../reducers/store';
import './event-panel.css';

const state = {
  active: null,
};

store.subscribe(() => {
  Object.assign(state, store.getState().eventPanel);
});

function onEventHover({ id }) {
  if (state.active !== id) {
    store.dispatch({ type: 'SET_ACTIVE_EVENT', eventId: id });
  }
}

function onEventPanelToggle() {
  store.dispatch({ type: 'TOGGLE_EVENT_PANEL' });
}

function renderEventList(events, onEventSelect) {
  const sorted = events.sort((a, b) => (a.time < b.time ? 1 : -1));

  return sorted.map(event => {
    const isActive = event.id === state.active;

    return (
      <EventItem
        onEventHover={onEventHover}
        onEventSelect={onEventSelect}
        isActive={isActive}
        {...event}
        key={event.id}
      />
    );
  });
}

const Panel = ({ events, onEventSelect }) => {
  const eventList = renderEventList(events, onEventSelect);
  return (
    <div className={'event-panel ' + (state.isVisible ? 'show' : '')}>
      <PanelToggle onClick={onEventPanelToggle} />
      <div className="event-panel-list">
        {eventList}
      </div>
    </div>
  );
};

Panel.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      location: PropTypes.object.isRequired,
    })
  ),
  onEventSelect: PropTypes.func.isRequired,
};

export default Panel;
