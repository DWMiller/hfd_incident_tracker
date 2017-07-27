const express = require('express');
const path = require('path');
const app = express();

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

const server = require('http').createServer(app);

const port = process.env.PORT || 3001;

const socket = require('./src/socket.js')(server);

server.listen(port, function() {
  console.log('Server listening at port %d', port);
});

app.use(express.static(path.join(__dirname, 'build')));

require('./src/twitter.js')(socket);

// const maintenance = require('./src/maintenance.js');
// maintenance.deletedOld();
