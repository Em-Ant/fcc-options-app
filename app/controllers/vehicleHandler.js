'use strict';

var Vehicle = require('../models/vehicle.js');
var Settings = require('../models/settings.js');
var _ = require('lodash');
var async = require("async");

var getWaypoints = require('../utils/directionsUtils').getWaypointDirections;
var geocoder = require('../utils/geocoder.js');
var wpt = require('../utils/waypointsUtils');
var routeConstants = require("../../client/src/constants/routeConstants");

function VehicleHandler() {
  var getErrorMessage = function(err){
    //returns first error message
    var key = Object.keys(err.errors)[0];
    return err.errors[key].message;
  }

  this.create = function(req, res) {
    var vehicle = new Vehicle(req.body);

    vehicle.save(function(err) {
      if (err) {
        return res.status(400).json({
          msg: getErrorMessage(err)
        });
      }
      //return object if no error
      return res.status(200).json(vehicle);
     });
  }

  //return all vehicles
  this.index = function(req, res) {

    // if query param 'populate' === 'true' populate consumers refs
    if(req.query.populate === 'true') {
      Vehicle.find({})
      .populate('consumers')
      .exec(function(err, vehicles) {
        if (err) {
          return res.status(400).json({
            msg: 'There was an error retrieving vehicles'
          });
        }
        return res.status(200).json(vehicles);
      });
    } else {
      // send consumers objectId
      Vehicle.find({}, '-__v', function(err, vehicles) {
        if (err) {
          return res.status(400).json({
            msg: 'There was an error retrieving vehicles'
          });
        }
        return res.status(200).json(vehicles);
      });
    }
  }

  this.show = function(req, res) {
    Vehicle.findById(req.params.id, function(err, vehicle) {
      if (err) {
        return res.status(500).json({
          msg: 'There was an error finding vehicle'
        });
      }
      if (!vehicle) {
        return res.status(404).json({
          msg: 'Vehicle not found'
        });
      }
      return res.status(200).json(vehicle);
    });
  }

  function updateVehicle(req, res) {
    Vehicle.findById(req.params.id, function(err, vehicle) {
      if (err) {
        return res.status(400).json({
          msg: 'There was an error finding vehicle'
        });
      }
      if (!vehicle) {
        return res.status(400).json({
          msg: 'Vehicle not found'
        });
      }
      var updated = Object.assign(vehicle, req.body);
      if(req.body.consumers){
        updated.markModified('consumers');
        updated.optimized = undefined;
        updated.maxPassengerDuration = undefined;
      }
      if(req.body.additionalWpts){
        updated.markModified('additionalWpts');
        updated.optimized = undefined;
        updated.maxPassengerDuration = undefined;
      }
      updated.save(function(err, savedVehicle) {
        if (err) {
          return res.status(400).json({
            msg: getErrorMessage(err)
          });
        }
        return res.status(200).json(savedVehicle);
      });
    });
  };

  this.update = function(req, res) {

    if (req.body._id) { delete req.body._id;}

    // there are version conflicts because we update the vehicle on every assignment
    // I have to remove __v from body, but we should avoid passing it around.
    delete req.body.__v;

    if (req.body.insert) {
      if(req.body.insert === 'additionalWpt') {
        // adding an additional waypoint
        // new waypoint is pushed into the array, so it's the last element
        var newWpt =
          req.body.additionalWpts[req.body.additionalWpts.length-1];

        // validate name and address
        if(!newWpt.name) return res.status(404).json({msg: 'Waypoint name is required'});
        if(!newWpt.address) return res.status(404).json({msg: 'Waypoint address is required'});

        // geolocate
        geocoder.getCoords(newWpt.address, function(err, coords){
          if(err) { return res.status(404).json({msg: 'Geolocator error'}); }
          //geocoder could not get coords for address
          if(!coords){
            return res.status(404).json({msg: 'Invalid Address'});
          }
          //set the coords to the waypoint
          newWpt.position = coords;
          updateVehicle(req, res);
        });
      } else {
        // if inserting a consumer, validate that is not already assigned
        var c_id = req.body.insert;
        delete req.body.insert;
        Vehicle.findOne({consumers: c_id}, function(err, vehicle){
          if(vehicle) {
            return res.status(400).json({
              msg: 'Consumer is already on a vehicle'
            });
          }

          if (err) {
            return res.status(400).json({
              msg: 'There was an error finding vehicles'
            });
          }
          // consumer is valid -> update vehicle
          updateVehicle(req, res);
        });
      }
    } else {
      // not inserting a consumer/waypoint -> update vehicle
      updateVehicle(req, res);
    }
  }

  //delete a vehicle
  this.destroy = function(req, res) {
    var v_id = req.params.id;
    Vehicle.findByIdAndRemove(v_id, function(err, vehicle) {
      if (err) {
        console.log(err);
        return res.status(400).json({
          msg: 'There was an error deleting vehicle'
        });
      }
      return res.status(200).json(v_id);
    });
  }

  function getWaypointsAsyncFn(consumers, destAddress) {

    return function(originIndex, callback) {

      var cns = consumers.slice();
      cns.splice(originIndex, 1)

      var waypoints = cns.map(function(c) {
        return c.address;
      })

      var originCons = consumers[originIndex];

      waypoints.unshift('optimize:true');
      waypoints = waypoints.join('|');

      getWaypoints(waypoints, originCons.address,  destAddress,
        function(err, response) {
        if (err) {
          console.log(err);
          return callback('Directions request failed');
        }

        // bubble-up originIndex
        response.originIndex = originIndex;

        callback(null, response);
      });
    }
  }

  this.optimizeRoute = function (req, res) {
    async.auto({
      get_options_inc_address: function(callback) {
        Settings.findOne({},'optionsIncAddress optionsIncCoords', function(err, response) {
          callback(err, response);
        })
      },
      get_vehicle: function(callback) {
        Vehicle.findById(req.params.id).populate('consumers').exec(function(err, vehicle) {
          callback(err, vehicle);
        })
      },
      get_optimized_wpts: ['get_options_inc_address', 'get_vehicle', function(results, callback) {

        if(results.get_vehicle.consumers.length +
            results.get_vehicle.additionalWpts.length <= 1
          || (results.get_vehicle.optimized === req.query.origin)
          || (!req.query.origin && results.get_vehicle.optimized === 'auto')) {

          var cIds = results.get_vehicle.consumers.map(c => c._id)
          results.get_vehicle.consumers = cIds;
          res.status(200).json(results.get_vehicle);
          return callback();
        }

        var optionsAddress = results.get_options_inc_address.optionsIncAddress;
        var optionsCoords = results.get_options_inc_address.optionsIncCoords;
        var waypoints = wpt.assembleWaypts(results.get_vehicle);

        var wptAsyncFn = getWaypointsAsyncFn(waypoints, optionsAddress);

        if(!req.query.origin) req.query.origin = 'auto';

        // if query param ?origin='first' optimizes using the first consumer as origin
        // else try all consumers as origin and make na API call for each consumer

        var originIndex = 0;

        var originIndexes = [];
        if(req.query.origin !== 'auto') {
          originIndexes.push(originIndex);
        } else {
          waypoints.forEach((w,i) => {
            if(w._type !== 'wpt') originIndexes.push(i)
          })
        }

        // call Google API to optimize each route
        async.map(originIndexes, wptAsyncFn, function(err, results) {
          
          var statusFail = results.some(function(result) {
              return result.status !== 'OK';
          });
          
          if (statusFail) return callback('error');
        
          
          if (results.length === 1) {
            let r = results[0];
            r.maxPassengerDuration = Math.ceil(
                r.routes[0].legs.reduce(function (prev, curr) {
                  let duration = prev + curr.duration.value
                  if (curr.start_address != curr.end_address) duration += routeConstants.VEHICLE_WAIT_TIME_SECONDS;
                  return duration ;
              }, 0) / 60
            )
            callback(null, r);
          } else {
            // calculate max passenger durations
            let maxPassengerDurations = results.map(function (r) {
              return r.routes[0].legs.reduce(function (prev, curr) {
                let duration = prev + curr.duration.value
                if (curr.start_address != curr.end_address) duration += routeConstants.VEHICLE_WAIT_TIME_SECONDS;
                return duration ;
              }, 0)
            })

            // find min duration
            let minDurationIndex = 0;
            maxPassengerDurations.forEach(function(d, i) {
              if (d < maxPassengerDurations[minDurationIndex])
                minDurationIndex = i;
            })

            // bubble up min duration route
            let r = results[minDurationIndex];
            r.maxPassengerDuration =
              Math.ceil(maxPassengerDurations[minDurationIndex] / 60);
            callback(null, results[minDurationIndex])
          }
        })
      }]
    }, function (err, results) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            msg: 'Could not optimize waypoints'
          });
        }

        // return if async chain has been escaped by a previous function
        if(!results.get_optimized_wpts) return;

        var wptOrder = results.get_optimized_wpts.routes[0].waypoint_order;
        var waypoints = wpt.assembleWaypts(results.get_vehicle);
        var maxDuration = results.get_optimized_wpts.maxPassengerDuration;

        // generate map Optimized waypoints -> start waypoints
        // i.e an array of indexes, without farthestIndex
        var map = waypoints.map(function(c, i) { return i});
        map.splice(results.get_optimized_wpts.originIndex, 1);

        var optimizedWpts = []

        // push the farthest first...
        optimizedWpts.push(waypoints[results.get_optimized_wpts.originIndex]);

        wptOrder.forEach(function(w) {
          // push the optimized list, mapped to vehicle.consumers array
          optimizedWpts.push(waypoints[map[w]])
        })

        var vehicle = results.get_vehicle;
        var vData = wpt.disassembleWaypts(optimizedWpts);
        vehicle.consumers = vData.consumers;
        vehicle.additionalWpts = vData.additionalWpts;
        vehicle.markModified('consumers');
        vehicle.markModified('additionalWpts');
        vehicle.optimized = req.query.origin || 'auto';
        vehicle.maxPassengerDuration = maxDuration;
        vehicle.save(function(err, saved) {
          if(err) {
            return res.status(500).json({
              msg: 'Could not save vehicle after waypoints optimization'
            });
          }
          res.status(200).json(vehicle);
        })
      }
    )
  }
}

module.exports = VehicleHandler;
