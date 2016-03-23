'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Route = new Schema({
	name: String,
	locationServed: String
});


module.exports = mongoose.model('Route', Route);
