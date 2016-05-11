'use strict';

var Vehicle = require('../models/vehicle.js');
var Settings = require('../models/settings.js');
//var coordsDistance = require('../utils/haversine');
var _ = require('lodash');
var async = require("async");

var getWaypoints = require('../utils/directionsUtils').getWaypointDirections;

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
      console.log('ok');
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
    } else {
      // not inserting a consumer -> update vehicle
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

        if(results.get_vehicle.consumers.length <= 1
          || (results.get_vehicle.optimized === req.query.origin)
          || (!req.query.origin && results.get_vehicle.optimized === 'auto')) {
          var cIds = results.get_vehicle.consumers.map(c => c._id)
          results.get_vehicle.consumers = cIds;
          res.status(200).json(results.get_vehicle);
          return callback();
        }

        var optionsAddress = results.get_options_inc_address.optionsIncAddress;
        var optionsCoords = results.get_options_inc_address.optionsIncCoords;
        var consumers = results.get_vehicle.consumers;

        var wptAsyncFn = getWaypointsAsyncFn(consumers, optionsAddress);

        if(!req.query.origin) req.query.origin = 'auto';

        // if query param ?origin='first' optimizes using the first consumer as origin
        // else origin is point-to-point farthest consumer from Options

        var originIndex = 0;

        /*
        var originConsumer = consumers[0];

        if (req.query.origin === 'furthest') {
          // calculate point-to-point farthest consumer and his/her index.
          var originConsumer = consumers.reduce(function(p, c, i) {
            var d1 = coordsDistance(p.position, optionsCoords);
            var d2 = coordsDistance(c.position, optionsCoords);
            if( d1 > d2) {
              return p;
            }
            else {
              originIndex = i;
              return c;
            }
          });
        }

        */

        var originIndexes = [];
        if(req.query.origin !== 'auto') {
          originIndexes.push(originIndex);
        } else {
          originIndexes = consumers.map((c,i) => i)
        }

        // call Google API to optimize each route
        async.map(originIndexes, wptAsyncFn, function(err, results) {
          if (results.length === 1) {
            let r = results[0];
            r.maxPassengerDuration = Math.ceil(
                r.routes[0].legs.reduce(function (prev, curr) {
                return prev + curr.duration.value;
              }, 0) / 60
            )
            callback(null, r);
          } else {
            // calculate max passenger durations
            let maxPassengerDurations = results.map(function (r) {
              return r.routes[0].legs.reduce(function (prev, curr) {
                return prev + curr.duration.value;
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
        var consumers = results.get_vehicle.consumers;
        var maxDuration = results.get_optimized_wpts.maxPassengerDuration;

        // generate map waypoints -> consumers
        // i.e an array of indexes, without farthestIndex
        var map = consumers.map(function(c, i) { return i});
        map.splice(results.get_optimized_wpts.originIndex, 1);

        var optimizedConsumerIds = []

        // push the farthest first...
        optimizedConsumerIds.push(consumers[results.get_optimized_wpts.originIndex]._id);

        wptOrder.forEach(function(w) {
          // push the optimized list, mapped to vehicle.consumers array
          optimizedConsumerIds.push(consumers[map[w]]._id)
        })

        var vehicle = results.get_vehicle;
        vehicle.consumers = optimizedConsumerIds;
        vehicle.markModified('consumers');
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
