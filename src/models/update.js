const mongoose = require('../mongoose-connection');
const Schema = mongoose.Schema;

const updateSchema = Schema({
  id: {
    type: Number,
    unique: true
  },
  category: String,
  city: String,
  coordinates: {
    lat: Number,
    lng: Number
  },
  formatted_address: String,
  intersection: String,
  originalLocation: String,
  streets: [String],
  time: String,
  type: String
});

module.exports = mongoose.model('Update', updateSchema);
