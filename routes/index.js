const express = require('express');
const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');

const incidentController = require('../controllers/incidentController');

router.get('/recent', catchErrors(incidentController.recent));

module.exports = router;
