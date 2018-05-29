const Koa = require('koa');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const path = require('path');
const logger = require('koa-logger');

const router = require('./routes');
const { notFound } = require('./helpers');

const app = new Koa();

if (app.env === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(logger());
}

app.use(cors());

app.use(serve('build'));

app.use(router.routes());
app.use(router.allowedMethods());

app.use(notFound);

// if (app.env === 'development') {
/* Development Error Handler - Prints stack trace */
// app.use(errorHandlers.developmentErrors);
// }

// production error handler
// app.use(errorHandlers.productionErrors);

module.exports = app;
