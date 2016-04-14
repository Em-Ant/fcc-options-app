'use strict';

var Vehicle = require('../models/vehicle.js');
var Settings = require('../models/settings.js');
var directionsUtils = require('../utils/directionsUtils');
var Directions = require("../models/directions");
var async = require("async");

function DirectionsHandler() {
  this.index = function(req, res) {
    async.auto({
      get_options_inc_address: function(callback) {
        Settings.findOne({},'optionsIncAddress', function(err, response) {
          callback(err, response.optionsIncAddress);
        })
      },
      get_vehicle: function(callback) {
        Vehicle.findById(req.params.id).populate('consumers').exec(function(err, response) {
          callback(err, response);
        })
      },
      get_directions: ['get_options_inc_address', 'get_vehicle', function(results, callback) {
        var optionsIncAddress = results.get_options_inc_address;
        directionsUtils.getDirections(results.get_vehicle, optionsIncAddress, optionsIncAddress, function(err, response) {
          callback(err, response);
        })
      }],
      save_directions: ['get_directions', function(results, callback) {
        var directions = results.get_directions;
        Directions.findOneAndUpdate({
          v_id: directions.v_id
        }, directions, {
          upsert: true
        }, function(err, response) {
          callback(err, response);
        });
      }]
    }, function(err, results) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          msg: 'Could not get directions'
        });
      }
      return res.status(200).json(results.get_directions);
    });

  }

}

module.exports = DirectionsHandler;
