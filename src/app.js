const cors = require('cors');
const path = require('path');

const express = require('express');

const routes = require('./routes');
const { notFound } = require('./helpers');

const app = express();

if (app.env === 'development') {
  /* Development Error Handler - Prints stack trace */
  // app.use(logger());
}

app.use(cors());

app.use(express.static(path.join(__dirname, '../build')));

app.use('/api', routes);

app.use('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.use(notFound);

// if (app.env === 'development') {
/* Development Error Handler - Prints stack trace */
// app.use(errorHandlers.developmentErrors);
// }

// production error handler
// app.use(errorHandlers.productionErrors);

module.exports = app;
