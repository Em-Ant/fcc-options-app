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
  // 1 non wheelchair consumer seat, or 2 foldable seats can accomodate 1 wheelchair consumer
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
  }],

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
  return this.maxFixedSeats + this.maxFoldableSeatsForWheelchairs - this.consumers.length;
});

// Number of seats available to  wheelchair consumers.
// Calculated values based on number of wheelchair consumers in vehicle.
Vehicle
.virtual('availableWheelchairs')
.get(function () {
  var consumerWheelchairsCount =  this.consumers.reduce(function(prev, curr){
    if(curr.hasWheelchair){
      return prev++;
    }
    return prev;
  }, 0);

  return this.maxFixedWheelchairs - consumerWheelchairsCount;

});

module.exports = mongoose.model('Vehicle', Vehicle);
