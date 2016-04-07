'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Vehicle = new Schema({
  name: {
    type: String,
    required: true
  },
  // non wheelchair consumer seats
  maxFixedSeats: {
    type: Number,
    required: true
  },
  // 1 non wheelchair consumer seat, or 2 foldable seats can accomodate 1
  // wheelchair consumer
  maxFoldableSeatsForWheelchairs: {
    type: Number,
    default: 0
  },
  // maximum amount of fixed wheelchairs spots a vehicle can hold
  maxFixedWheelchairs: {
    type: Number,
    default: 0
  },
  // consumers that are in the vehicle
  consumers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumer',
  }]
});


module.exports = mongoose.model('Vehicle', Vehicle);
