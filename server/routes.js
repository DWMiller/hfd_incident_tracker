const express = require('express');
const router = express.Router();
const incidentController = require('./controllers/incidentController');

router.get('/recent', incidentController.recent);
router.get('/incident/:code', incidentController.incident);

module.exports = router;
