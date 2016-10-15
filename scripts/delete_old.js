const db = require('../src/database.js');

const DAY = 86400000;
const TWO_DAYS_AGO = (Date.now() - (DAY * 2));

db.updates.remove({
  $where() {
    return this.time < TWO_DAYS_AGO;
  },
}, {
  multi: true,
});

db.tweets.remove({
  $where() {
    return this.timestamp_ms < TWO_DAYS_AGO;
  },
}, {
  multi: true,
});
