var Datastore = require('nedb');

var db = new Datastore({
    filename: 'database',
    autoload: true,
    timestampData: true
});

db.ensureIndex({
    fieldName: 'code'
}, function(err) {});

module.exports = db;
