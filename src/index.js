import React from 'react';
import io from 'socket.io-client';
import ReactDOM from 'react-dom';
import createApp from './components/app';
import './index.css';

const App = createApp(React);

const mapProps = { alerts: [] };

function startSocket() {
  const socket = location.port ? io('//localhost:3001') : io();

  socket.on('connected', () => {
    console.log('connected');
    // Now that we are connected to the server let's tell
    // the server we are ready to start receiving tweets.
    socket.emit('all_events');

    setInterval(
      () => {
        socket.emit('ping');
      },
      1.7e6
    );
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

socket.on('events', data => {
  console.log('Startup data received: ', data);
  mapProps.alerts.length = 0;
  Array.prototype.push.apply(mapProps.alerts, data);
  render();
});

socket.on('event', update => {
  console.log('Update received: ', update);
  mapProps.alerts.push(update);
  render();
});

render();
