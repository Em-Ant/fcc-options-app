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
        
        var savedDirections =  Object.assign({}, {
          origin_address:results.get_saved_directions.origin_address,
          destination_address:results.get_saved_directions.destination_address,
          waypoints:results.get_saved_directions.waypoints
        });
       
        var newWaypoints = results.get_vehicle.consumers.map(function(consumer){
          return{
            _id:consumer._id,
            name:consumer.name,
            address:consumer.address
          }
        })
        var newDirections = {
          origin_address:results.get_options_inc_address,
          destination_address:results.get_options_inc_address,
          waypoints:newWaypoints
        }
        console.log("savedDirections", savedDirections);
        console.log("newDirections", newDirections);
        if( _.isEqual(savedDirections, newDirections)
        ){
          console.log("Both directions are equal");
            return res.status(200).json(results.get_saved_directions);
        }
        console.log("Both directions are not equal");
        callback(null, false);
      }],
      get_directions: ['get_options_inc_address', 'get_vehicle', 'check_modified', function(results, callback) {
        console.log("get_directions called");
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
