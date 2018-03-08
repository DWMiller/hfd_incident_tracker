const Koa = require('koa');
const Router = require('koa-router');

const router = new Router();

const { catchErrors } = require('../handlers/errorHandlers');

const incidentController = require('../controllers/incidentController');

router.get('/recent', catchErrors(incidentController.recent));

module.exports = router;
