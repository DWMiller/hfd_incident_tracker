const mongoose = require('mongoose');

require('dotenv').config({ path: __dirname + '/../variables.env' });

mongoose.connect(process.env.MONGO_URI, {
  useMongoClient: true,
  promiseLibrary: global.Promise,
});

mongoose.connection.on('error', err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

module.exports = mongoose;
