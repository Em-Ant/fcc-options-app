'use strict';

var Vehicle = require('./vehicle');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Consumer = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  sex: {
    type: String,
    required: true,
    enum: ['male', 'female']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  phone: String,
  position: {
    lat: Number,
    lng: Number
  },
  notes: String,

  createdAt: {
    type: Date,
    default: Date.now
  },

  // Needs flags
  needsWave: Boolean,
  behavioralIssues: Boolean,
  needsTwoSeats: Boolean,
  hasSeizures: Boolean,
  hasWheelchair: Boolean,
  hasMedications: Boolean
});

// Removing consumer from vehicles references
// Back-end fix to #13

Consumer.pre('remove', function(next) {
	removeConsumerFromVehicle(this._id,this.model("Vehicle"), next);
});

function removeConsumerFromVehicle(consumerId, vehicle ,next){
	  vehicle.update({
	    consumers: consumerId
	  }, {
	    $pull: {
	      consumers: consumerId
	    }
	  },next);
}

module.exports = mongoose.model('Consumer', Consumer);
