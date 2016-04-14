'use strict';

var Vehicle = require('../models/vehicle.js');
var Settings = require('../models/settings.js');
var directionsUtils = require('../utils/directionsUtils');
var async = require("async");

function DirectionsHandler() {
  this.index = function(req, res) {
    var settings;
    var vehicle;
    async.series([
        function(callback) {
          Settings.findOne({}, function(err, response) {
            settings = response;
            callback(err, response);
          })
        },
        function(callback) {
          Vehicle.findById(req.params.id).populate('consumers').exec(function(err, response) {
            vehicle = response;
            callback(err, response);
          })
        },
        function(callback) {
          directionsUtils.getDirections(vehicle, settings.optionsIncAddress, settings.optionsIncAddress, function(err, response) {
            callback(err, response);
          })
        }
      ],
      function(err, results) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            msg: 'Could not get directions'
          });
        }
        return res.status(200).json(results[2]);
      });

  }

}

module.exports = DirectionsHandler;
