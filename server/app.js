const cors = require('cors');
const path = require('path');
const express = require('express');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../react-ui/build')));
app.use('/api', routes);

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

module.exports = app;
