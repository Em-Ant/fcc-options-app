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
    for (var i = 0; i < vehicles.length; i++) {
      if (vehicles[i].consumers.length >= self.maxPassengersPerVehicle ) {
        invalid = true;
        break;
      }
    }
    if (invalid) {
      self.invalidate('settings', 'Some vehicles exceed maxPassengersPerVehicle, remove consumers first');
    }
    next();
  })
}

module.exports = mongoose.model('Settings', Settings);
