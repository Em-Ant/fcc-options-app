'use strict';

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var idvalidator = require('mongoose-id-validator');
var vehicleUtils = require('../../client/src/utils/vehicleUtils');
var Schema = mongoose.Schema;
var Consumer = require('./consumer');

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
    ref: 'Consumer'
  }] });

Vehicle.plugin(uniqueValidator, { message: 'Another vehicle with that {PATH} already exists' });

Vehicle.plugin(idvalidator);

Vehicle.pre('validate', validateConsumersCanFit)

function validateConsumersCanFit(next){
  var vehicleModel = mongoose.model("Vehicle");
  var self = this;
  var vehicleCopy = self.toObject();
  vehicleModel.populate(vehicleCopy, {path:"consumers"}, function(err, vehicle){
    var valid =  vehicleUtils.validate(vehicle);
    if(!valid){
      self.invalidate('consumers', 'Consumers cannot fit in vehicle anymore');
    }
    next();
  });
}

module.exports = mongoose.model('Vehicle', Vehicle);
