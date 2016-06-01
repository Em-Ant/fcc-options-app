'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Directions = new Schema({
  v_id: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true,
    ref: 'Vehicle',
  },
  origin_address:String,
  destination_address:String,
  waypoints:[{
    name: String,
    description: String,
    address: String
  }],
  morningRoute: mongoose.Schema.Types.Mixed,
  eveningRoute: mongoose.Schema.Types.Mixed,
  morningStartTime:{
    type: Date,
    required:true,
    default: '1464764400000' // 06/01/2016-07:00AM
  },
  eveningStartTime:{
    type: Date,
    required:true,
    default: '1464793200000' // 06/01/2016-03:00PM
  }
});

module.exports = mongoose.model('Directions', Directions);
