'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Settings = new Schema({
  optionsIncAddress: {type: String, required: true},
  maxPassengersPerVehicle: {type: Number, required: true},
  maxConsumerRouteTime: {type: Number, required: true}
});

module.exports = mongoose.model('Settings', Settings);
