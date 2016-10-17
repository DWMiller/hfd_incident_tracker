import React from 'react';
import io from 'socket.io-client';
import ReactDOM from 'react-dom';
import createApp from './app/App';
import './index.css';

const App = createApp(React);

// const actions = {
//   update() {
//     render();
//   },
// };

const mapProps = {
  alerts: [],
};

function startSocket() {
  const socket = io.connect('http://localhost:80/');

    // const socket = io.connect(window.location.href);

        // Listens for a success response from the server to
        // say the connection was successful.
  socket.on('connected', () => {
            // Now that we are connected to the server let's tell
            // the server we are ready to start receiving tweets.
    socket.emit('all_events');
  });

  return socket;
}

function render() {
  ReactDOM.render(
    <App alerts={mapProps.alerts} />,
    document.getElementById('root')
  );
}

const socket = startSocket();

socket.on('events', (data) => {
  console.log(data);
  data.forEach((alert) => {
    mapProps.alerts.push(alert);
  });
  render();
});

socket.on('event', (update) => {
  console.log(update);
  mapProps.alerts.push(update);
  render();
});

render();
