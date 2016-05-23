var GoogleMapsAPI = require('googlemaps');
var config = {
  key: process.env.GOOGLE_API_SERVER_KEY,
  encode_polylines: false,
  secure: true
};
var gmAPI = new GoogleMapsAPI(config);
var async = require("async");

var assembleWaypts = require('../utils/waypointsUtils').assembleWaypts;

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
      }
    ],
    function(err, results) {
      if (err) {
        return done(err);
      }
      morningDirections = addAppDataToDirections(morningDirections, morningConsumers, 'AM');
      eveningDirections = addAppDataToDirections(eveningDirections, eveningConsumers, 'PM');

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



function addAppDataToDirections(directions, consumers, routeType) {
  if(directions.status === 'OK') {

    var totalDuration = 0;
    var maxPassengerDuration = 0;
    var totalDistance = 0;

    var legs = directions.routes[0].legs;
    legs.forEach(function(leg, index) {
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

    if (routeType === 'AM') {
      // AM route
      maxPassengerDuration -= legs[0].duration.value;
      // AM route
    } else {
      // PM route
      maxPassengerDuration -= legs[legs.length - 1].duration.value;
    }
    directions.routes[0].totalDuration = totalDuration;
    directions.routes[0].maxPassengerDuration = maxPassengerDuration;
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
