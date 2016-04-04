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

Vehicle
  .virtual('occupiedSeats')
  .get(function() {
    var occupiedSeats = 0;
    this.consumers.forEach(function(consumer) {
      if (!consumer.hasWheelchair) {
        occupiedSeats++;
      }
    });
    return occupiedSeats;
  });

Vehicle
  .virtual('totalSeats')
  .get(function() {
    return this.maxFixedSeats + this.maxFoldableSeatsForWheelchairs;
  });

Vehicle
  .virtual('occupiedWheelchairs')
  .get(function() {
    var occupiedWheelchairs = 0;
    this.consumers.populate().forEach(function(consumer) {
      if (consumer.hasWheelchair) {
        occupiedWheelchairs++;
      }
    });
    return occupiedWheelchairs;
  });

Vehicle
  .virtual('totalWheelchairs')
  .get(function() {
    return this.maxFixedWheelchairs + Math.floor((this.maxFoldableSeatsForWheelchairs / 2));
  });


module.exports = mongoose.model('Vehicle', Vehicle);
