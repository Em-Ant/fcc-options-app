'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Route = new Schema({
	name: {type: String, required: true, unique:true},
	locationServed: String,
	//this will be an object type
	vehicle: String

});


module.exports = mongoose.model('Route', Route);
