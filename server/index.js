const app = require('./app');
const { Server } = require('socket.io');
const { startPolling } = require('./arcgis/arcgisPoller');

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`Express Running → PORT ${server.address().port} -> Started at: ${new Date()}`);
});

const io = new Server(server, { cors: { origin: '*' } });

startPolling(newIncidents => {
  for (const incident of newIncidents) {
    io.emit('incident', incident);
    console.log(`Broadcast: ${incident.location.address}`);
  }
});
