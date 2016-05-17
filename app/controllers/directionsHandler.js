'use strict';

var Vehicle = require('../models/vehicle.js');
var Settings = require('../models/settings.js');
var directionsUtils = require('../utils/directionsUtils');
var Directions = require("../models/directions");
var _ = require("lodash");

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
      get_saved_directions: ['get_options_inc_address', 'get_vehicle', function(results, callback) {
        Directions.findOne({v_id:results.get_vehicle._id},function(err, response){
          callback(err, response);
        })
      }],
      check_modified: ['get_options_inc_address', 'get_vehicle', 'get_saved_directions', function(results, callback) {
        if(!results.get_saved_directions){
          return callback(null, false);
        }
        var savedWaypoints = results.get_saved_directions.waypoints.slice().map(function(waypoint){
          return{
            name:waypoint.name,
            address:waypoint.address
          }
        })
        var savedDirections =  Object.assign({}, {
          origin_address:results.get_saved_directions.origin_address,
          destination_address:results.get_saved_directions.destination_address,
          waypoints:savedWaypoints
        });

        var newWaypoints = results.get_vehicle.consumers.map(function(consumer){
          return{
            name:consumer.name,
            address:consumer.address
          }
        })
        var newDirections = {
          origin_address:results.get_options_inc_address,
          destination_address:results.get_options_inc_address,
          waypoints:newWaypoints
        }
        if( _.isEqual(savedDirections, newDirections)
        ){
            return res.status(200).json(results.get_saved_directions);
        }
        callback(null, false);
      }],
      get_directions: ['get_options_inc_address', 'get_vehicle', 'check_modified', function(results, callback) {
        var optionsIncAddress = results.get_options_inc_address;
        directionsUtils.getDirections(results.get_vehicle, optionsIncAddress, optionsIncAddress, function(err, response) {
          callback(err, response);
        })
      }],
      save_directions: ['get_directions', function(results, callback) {
        var directions = results.get_directions;
        var maxPassDurationMinutes =
          Math.ceil(results.get_directions.morningRoute.maxPassengerDuration/60);
          // update vehicle max pass duration
        Vehicle.findOneAndUpdate({_id: directions.v_id},
          {$set: {maxPassengerDuration: maxPassDurationMinutes}}, function(err, stat){
            // update directions
            Directions.findOneAndUpdate({
              v_id: directions.v_id
            }, directions, {
              upsert: true
            }, function(err, response) {
              callback(err, response);
            });
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
