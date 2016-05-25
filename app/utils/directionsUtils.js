var GoogleMapsAPI = require('googlemaps');
var config = {
  key: process.env.GOOGLE_API_SERVER_KEY,
  encode_polylines: false,
  secure: true
};
var gmAPI = new GoogleMapsAPI(config);
var async = require("async");

var routeConstants = require('../../client/src/constants/routeConstants.js');

var assembleWaypts = require('../utils/waypointsUtils').assembleWaypts;

var Settings = require('../models/settings.js');

module.exports.getWaypointDirections = getWaypointDirections;
module.exports.getDirections = function(vehicle, origin, destination, done) {
  var morningConsumers = assembleWaypts(vehicle);
  var morningWaypoints = getWaypoints(morningConsumers);
  var eveningConsumers = assembleWaypts(vehicle).slice().reverse();
  var eveningWaypoints = getWaypoints(eveningConsumers);
  var morningDirections;
  var eveningDirections;
  var directions;
  async.parallel([
      function(callback) {
        getWaypointDirections(morningWaypoints, origin, destination, function(err, response) {
          morningDirections = response;
          callback(err, response);
        })
      },
      function(callback) {
        getWaypointDirections(eveningWaypoints, origin, destination, function(err, response) {
          eveningDirections = response;
          callback(err, response);
        })
      },
      function(callback) {
        Settings.findOne({},'averageStopWaitSeconds', function(err, data) {
          callback(err, data);
        })
      }
    ],
    function(err, results) {
      if (err) {
        return done(err);
      }
      var avgWaitTime = results[2].averageStopWaitSeconds;
      morningDirections = addAppDataToDirections(morningDirections, morningConsumers,
        routeConstants.AM_ROUTE_TYPE, avgWaitTime);
      eveningDirections = addAppDataToDirections(eveningDirections, eveningConsumers,
        routeConstants.PM_ROUTE_TYPE, avgWaitTime);

      var waypoints = morningConsumers.map(function(consumer){
        return{
          name:consumer.name,
          description: consumer.description,
          address:consumer.address
        }
      });

      directions = {
        v_id: vehicle._id,
        morningRoute: morningDirections.routes[0],
        eveningRoute: eveningDirections.routes[0],
        waypoints: waypoints,
        origin_address: origin,
        destination_address:destination,
        statusOk : morningDirections.status === 'OK' && eveningDirections.status === 'OK'

      }
      return done(null, directions);
    });
}

function getWaypointDirections(waypoints, origin, destination, done) {
  gmAPI.directions({
    origin: origin,
    destination: destination,
    waypoints: waypoints,
    travelMode: 'driving'
  }, function(err, response) {
    if (err) {
      console.log(err);
      return done('Directions request failed');
    }
    done(null, response);
  });
}



function addAppDataToDirections(directions, consumers, routeType, avgWaitTime) {
  if(directions.status === 'OK') {

    var totalDuration = 0;
    var maxPassengerDuration = 0;
    var totalDistance = 0;

    var legs = directions.routes[0].legs;
    legs.forEach(function(leg, index) {
      if(leg.start_address != leg.end_address){
        totalDuration += avgWaitTime;
        maxPassengerDuration += avgWaitTime;
      }
      totalDuration += leg.duration.value;
      maxPassengerDuration += leg.duration.value;
      totalDistance += leg.distance.value;
      if (index == 0) {
        leg.start_location_name = "Options Inc.";
      } else {
        var consumer = consumers[index - 1];
        leg.start_location_name = consumer.name;
      }
      if (index == legs.length - 1) {
        leg.end_location_name = "Options Inc.";
      } else {
        var consumer = consumers[index];
        leg.end_location_name = consumer.name;
      }
    })

    if (routeType === routeConstants.AM_ROUTE_TYPE) {
      // AM route
      maxPassengerDuration -= legs[0].duration.value ;
      // AM route
    } else {
      // PM route
      maxPassengerDuration -= legs[legs.length - 1].duration.value ;
    }
    directions.routes[0].totalDuration = totalDuration - avgWaitTime;
    directions.routes[0].maxPassengerDuration = maxPassengerDuration - 2*avgWaitTime;
    directions.routes[0].totalDistance = totalDistance;
  }
  return directions;
}

var getWaypoints = function(consumers) {
  var waypts = [];
  consumers.forEach(function(consumer) {
    waypts.push(consumer.address);
  });
  return waypts.join("|");
}
