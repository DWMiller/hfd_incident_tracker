const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const incidentSchema = mongoose.Schema({
  id: {
    type: String,
  },
  code: String,
  category: String,
  locationName: String,
  type: String,
  time: {
    type: Date,
    required: 'Date missing',
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
  tweets: [String],
});

incidentSchema.index({
  location: '2dsphere',
});

module.exports = mongoose.model('Incident', incidentSchema);
