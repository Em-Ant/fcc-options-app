'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Consumer = new Schema({
	name: {type: String, required: true},
  sex: {type: String, required: true, enum:['male', 'female']},
  address: {type: String, required: true},
  phone: String,

  // Details flags
  needsWave: {type: Boolean, default: false},
  canSitNearOppositeSex: {type: Boolean, default: true},
  needsTwoSeats: {type: Boolean, default: false},
  hasSeizures: {type: Boolean, default: false},
  hasWeelchair: {type: Boolean, default: false},
  hasMedications: {type: Boolean, default: false},
});

module.exports = mongoose.model('Consumer', Consumer);
