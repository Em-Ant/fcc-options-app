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
  }],

  driver:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    validate: {
      validator: function(staff) {
        return staff.roles.indexOf("driver") !== -1;
      },
      message: 'Driver must be a staff member with a driver role'
    }
  },

  rider:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    validate: {
      validator: function(staff) {
        return staff.roles.indexOf("rider") !== -1;
      },
      message: 'Rider must be a staff member with a rider role'
    }
  }


});

Vehicle.plugin(uniqueValidator, { message: 'Another vehicle with that {PATH} already exists' });

Vehicle.plugin(idvalidator);

Vehicle.pre('validate', validateConsumersCanFit)

Vehicle.pre('validate', validateMaxConsumersCount)

function validateConsumersCanFit(next) {
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

function validateMaxConsumersCount(next) {
  var settingsModel = mongoose.model("Settings");
  var self = this;
  var settings = settingsModel.findOne(function(err, settings) {
    if (err) {
      self.invalidate('consumers', 'Settings cannot be accessed')
    }
    var driverSeatCount = 1;
    if (
      self.consumers.length >
        (settings.maxPassengersPerVehicle - driverSeatCount)
      ) {
      self.invalidate('consumers', 'Consumers exceed max allowed passengers')
    }
    next();
  })

}
module.exports = mongoose.model('Vehicle', Vehicle);
