const mongoose = require('../mongoose-connection');
const Schema = mongoose.Schema;

const incidentSchema = Schema({
  id: {
    type: Number,
    unique: true
  },
  code: String,
  category: String,
  coordinates: {
    lat: Number,
    lng: Number
  },
  formatted_address: String,
  locationName: String,
  time: String,
  type: String
});

module.exports = mongoose.model('Incident', incidentSchema);