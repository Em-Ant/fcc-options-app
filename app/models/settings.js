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
  },
  averageStopWaitSeconds: {
    type: Number,
    min: [0, 'The average stop wait time cannot be negative'],
    default: 180
  }
});

Settings.pre('validate', validateVehiclesPassengers);

function validateVehiclesPassengers(next) {
  var vehicleModel = mongoose.model("Vehicle");
  var self = this;
  vehicleModel.find(function (err, vehicles) {
    if (err) {
      self.invalidate('settings', 'Vehicles cannot be accessed')
      return next();
    }
    var invalid = false;
    var riderSeatCount;
    // Always counting driver, because his/her presence is mandatory
    var driverSeatCount = 1;
    for (var i = 0; i < vehicles.length; i++) {
      riderSeatCount = vehicles[i].rider ? 1 : 0;
      if (vehicles[i].consumers.length + riderSeatCount >
          self.maxPassengersPerVehicle - driverSeatCount ) {
        invalid = true;
        break;
      }
    }
    if (invalid) {
      self.invalidate('settings',
      'Some vehicles exceed max allowed passengers');
    }
    next();
  })
}

module.exports = mongoose.model('Settings', Settings);
