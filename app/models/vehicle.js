'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Vehicle = new Schema({
	name: {type: String, required: true},
  seatingCapacity:{type:Number, required:true},
  wheelchairCapacity:{type:Number, default: 0}
});

module.exports = mongoose.model('Vehicle', Vehicle);
