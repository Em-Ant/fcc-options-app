'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Route = new Schema({
	name: {type: String, required: true},
	locationServed: String,
	//this will be an object type
	vehicle: String,
	consumers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumer',
  }]

});


module.exports = mongoose.model('Route', Route);
