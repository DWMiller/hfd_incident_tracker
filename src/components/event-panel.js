import eventItemCreate from './event-panel-item';
import panelToggleCreate from './event-panel-toggle';
import store from '../reducers/store';
import './event-panel.css';

export default React => {
  const EventItem = eventItemCreate(React);
  const PanelToggle = panelToggleCreate(React);

  const state = {
    active: null
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
    const sorted = events.sort((a, b) => a.time < b.time ? 1 : -1);

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
    events: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        coordinates: React.PropTypes.object.isRequired
      })
    ),
    onEventSelect: React.PropTypes.func.isRequired
  };

  return Panel;
};
