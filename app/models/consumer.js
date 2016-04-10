'use strict';

var Vehicle = require('./vehicle');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Consumer = new Schema({
	name: {type: String, required: true},
  sex: {type: String, required: true, enum:['male', 'female']},
  address: {type: String, required: true},
  phone: String,
  position: {
    lat: Number,
    lng: Number
  },

  // Needs flags
  needsWave: Boolean,
  cannotSitNearOppositeSex: Boolean,
  needsTwoSeats: Boolean,
  hasSeizures: Boolean,
  hasWheelchair: Boolean,
  hasMedications: Boolean
});

// Removing consumer from vehicles references
// Back-end fix to #13

Consumer.pre('remove', function(next){
  Vehicle.update({},{$pull: {consumers: this._id}}, function(err, ok){
    if (err) {
      var err = new Error("Error removing consumer from vehicles");
      next(err)
    }
    next();
  })
});

module.exports = mongoose.model('Consumer', Consumer);
