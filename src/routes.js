const express = require('express');
const router = express.Router();

const { catchErrors } = require('./helpers');

const incidentController = require('./controllers/incidentController');

router.get('/recent', catchErrors(incidentController.recent));

router.get('/incident/:code', catchErrors(incidentController.incident));

module.exports = router;
