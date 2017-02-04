const Datastore = require('nedb');

const nedb = {
  tweets: new Datastore({
    filename: `${__dirname}/../databases/tweets`,
    autoload: true,
    timestampData: true
  }),
  updates: new Datastore({
    filename: `${__dirname}/../databases/updates`,
    autoload: true,
    timestampData: true
  })
};

nedb.updates.ensureIndex({
  fieldName: 'code'
});

module.exports = nedb;
