import createMap from './map';
import './app.css';

// store.subscribe(() => {
//   console.log(store.getState());
// });
export default React => {
  const app = ({ alerts }) => {
    const Map = createMap(React);

    return (
      <div className="App">
        <Map alerts={alerts} />
      </div>
    );
  };

  app.propTypes = { alerts: React.PropTypes.arrayOf(React.PropTypes.object) };

  return app;
};
