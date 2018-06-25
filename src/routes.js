const Koa = require('koa');
const Router = require('koa-router');

const router = new Router();

const { catchErrors } = require('./helpers');

const incidentController = require('./controllers/incidentController');

router.get('/api/recent', catchErrors(incidentController.recent));

router.get('/api/incident/:code', catchErrors(incidentController.incident));

module.exports = router;
