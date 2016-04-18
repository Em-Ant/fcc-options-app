'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Settings = new Schema({
  optionsIncAddress: {
    type: String,
    required: [true, 'Please enter the Options Inc Address']
  },
  optionsIncCoords: {
    lat: {
      type: Number,
      required: [true, 'Please enter the Options Inc coordinates']
    },
    lng: {
      type: Number,
      required: [true, 'Please enter the Options Inc coordinates']
    }
  },
  maxPassengersPerVehicle: {
    type: Number,
    required: [true, 'Please enter the max passengers per vehicle'],
    min: [1, 'The max passengers per vehicle must be at least 1']
  },
  maxConsumerRouteTime: {
    type: Number,
    required: [true, 'Please enter the max consumer route time'],
    min: [1, 'The max consumer route time must be at least 1']
  }
});

module.exports = mongoose.model('Settings', Settings);
