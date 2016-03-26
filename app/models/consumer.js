'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Consumer = new Schema({
	name: {type: String, required: true},
  sex: {type: String, required: true, enum:['male', 'female']},
  address: {type: String, required: true},
  phone: String,

  // Details flags
  needsWave: Boolean,
  cannotSitNearOppositeSex: Boolean,
  needsTwoSeats: Boolean,
  hasSeizures: Boolean,
  hasWheelchair: Boolean,
  hasMedications: Boolean
});

module.exports = mongoose.model('Consumer', Consumer);
