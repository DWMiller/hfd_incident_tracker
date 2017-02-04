import createMap from './map';
import createEventPanel from './event-panel';
import './app.css';

export default React => {
  const app = ({ alerts }) => {
    const Map = createMap(React);
    const Panel = createEventPanel(React);

    return (
      <div className="App">
        <Map alerts={alerts} />
        <Panel events={alerts} />
      </div>
    );
  };

  app.propTypes = { alerts: React.PropTypes.arrayOf(React.PropTypes.object) };

  return app;
};
