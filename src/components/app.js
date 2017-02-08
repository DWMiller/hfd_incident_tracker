import createMap from './map';
import createEventPanel from './event-panel';
import './app.css';
import store from '../reducers/store';

export default React => {
  const Map = createMap(React);
  const Panel = createEventPanel(React);

  function onEventSelect(event) {
    store.dispatch({
      type: 'MAP_CHANGE',
      settings: {
        center: event.coordinates
      }
    });
  }

  const App = props => {
    return (
      <div className="App">
        <Map
          active={props.state.eventPanel.active}
          settings={props.state.map}
          alerts={props.state.events}
        />
        <Panel events={props.state.events} onEventSelect={onEventSelect} />
      </div>
    );
  };
  App.propTypes = {
    state: React.PropTypes.object
  };
  return App;
};
