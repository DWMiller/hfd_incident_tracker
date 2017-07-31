const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const incidentSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  code: String,
  category: String,
  locationName: String,
  type: String,
  created: {
    type: Date,
    default: Date.now(),
  },
  updated: {
    type: Date,
    default: Date.now(),
  },
  location: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: [
      {
        type: Number,
        required: 'Incident coordinates missing',
      },
    ],
    address: {
      type: String,
      required: 'Incident address missing',
    },
  },
});

module.exports = mongoose.model('Incident', incidentSchema);
