const DAY = 86400000;
const DAY_AGO = Date.now() - DAY;

const twitter = require('../src/twitter.js');
const Incident = require('../src/models/Incident.js');
const Tweet = require('../src/models/Tweet.js');
