const Datastore = require('nedb');

const db = {
  tweets: new Datastore({
    filename: `${__dirname}/../databases/tweets`,
    autoload: true,
    timestampData: true,
  }),
  updates: new Datastore({
    filename: `${__dirname}/../databases/updates`,
    autoload: true,
    timestampData: true,
  }),
};

db.updates.ensureIndex({
  fieldName: 'code',
});

module.exports = db;
