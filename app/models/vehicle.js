'use strict';

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var idvalidator = require('mongoose-id-validator');
var Schema = mongoose.Schema;

var Vehicle = new Schema({

  name: {
    type: String,
    required:[true, 'Please enter a vehicle name'],
    unique:true
  },
  seats: {
    type: Number,
    required: [true, 'Please enter the number of seats'],
    min: [0, 'The number of seats can\'t be negative']
  },
  // 1 flexSeat = 1 non wheelchair  seat, or 2 flex seats = 1 wheelchair
  flexSeats: {
    type: Number,
    default: 0,
    min: [0, 'The number of foldable seats can\'t be negative']
  },
  wheelchairs: {
    type: Number,
    default: 0,
    min: [0, 'The number of wheelchairs can\'t be negative']
  },
  consumers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumer',
  }] });

/* OLD
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
*/
Vehicle.plugin(uniqueValidator, { message: 'Another vehicle with that {PATH} already exists' });
Vehicle.plugin(idvalidator);

module.exports = mongoose.model('Vehicle', Vehicle);
