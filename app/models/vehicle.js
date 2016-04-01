'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Vehicle = new Schema({
  name: {
    type: String,
    required: true
  },
  // 1 non wheelchair consumer seats
  maxFixedSeats: {
    type: Number,
    required: true
  },
  // 1 non wheelchair consumer seats, or 2 foldable seats can accomodate 1 wheelchair consumer
  maxFoldableSeats: {
    type: Number,
    default: 0
  },
  // maximum amount of wheelchairs a vehicle can hold
  maxWheelchairs: {
    type: Number,
    default: 0
  },
  // consumers that are in the vehicle
  consumers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumer',
  }],

  availableWheelchairs: {
    type: Number,
    default: 0
  }
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

// Number of seats available to non wheelchair consumers.
// Calculated values based on number of consumers in vehicle.
Vehicle
.virtual('availableSeats')
.get(function () {
  return this.maxFixedSeats;
});


module.exports = mongoose.model('Vehicle', Vehicle);
