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
    default: 'Fri May 20 2016 07:00:00 GMT-0700 (PDT)'
  },
  eveningStartTime:{
    type: Date,
    required:true,
    default: 'Fri May 20 2016 15:00:00 GMT-0700 (PDT)'
  }
});

module.exports = mongoose.model('Directions', Directions);
