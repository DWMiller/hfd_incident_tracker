import createMap from './map';
import createEventPanel from './event-panel';
import './app.css';

export default React => {
  const Map = createMap(React);
  const Panel = createEventPanel(React);

  const App = props => {
    return (
      <div className="App">
        <Map
          active={props.state.eventPanel.active}
          settings={props.state.map}
          alerts={props.state.events}
        />
        <Panel events={props.state.events} />
      </div>
    );
  };
  App.propTypes = {
    state: React.PropTypes.object
  };
  return App;
};
