var GoogleMapsAPI = require('googlemaps');
var config = {
      key: process.env.GOOGLE_API_SERVER_KEY,
      encode_polylines:   false,
      secure:             true
    };
var gmAPI = new GoogleMapsAPI(config);
var async = require("async");

module.exports.getDirections= function(vehicle, origin, destination, done){
  var morningConsumers = vehicle.consumers;
  var morningWaypoints= getWaypoints(morningConsumers);
  var eveningConsumers = vehicle.consumers.slice().reverse();
  var eveningWaypoints= getWaypoints(eveningConsumers);
  async.series([
      function(callback) {

        getWaypointDirections(morningWaypoints, origin, destination, function(err, morningResponse){
          callback(err, morningResponse);
        })
      },
      function(callback) {
        getWaypointDirections(eveningWaypoints, origin, destination, function(err, eveningResponse){
          callback(err, eveningResponse);
        })
      }
    ],
    function(err, results) {
      if(err){
        return done(err);
      }
      results[0] = addAppDataToDirections(results[0], morningConsumers);
      results[1] = addAppDataToDirections(results[1], eveningConsumers);

      var directions = {};
      directions.morningRoute = results[0].routes[0];
      directions.eveningRoute = results[1].routes[0];

      return done(null, directions);
    });
}

function getWaypointDirections(waypoints, origin, destination, done){
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
    }
  );
}

function addAppDataToDirections(directions, consumers){
  var totalDuration = 0;
  var maxPassengerDuration = 0;
  var totalDistance = 0;
  var legs = directions.routes[0].legs;
  legs.forEach(function(leg,index){
    totalDuration += leg.duration.value;
    if(index != 0){
      maxPassengerDuration += leg.duration.value;
    }
    totalDistance += leg.distance.value;
    if(index == 0){
      leg.start_location_name = "Options Inc.";
    }else{
      var consumer = consumers[index-1];
      leg.start_location_name=consumer.name;
    }
    if(index == legs.length - 1){
      leg.end_location_name = "Options Inc.";
    }else{
      var consumer = consumers[index];
      leg.end_location_name=consumer.name;
    }
  })
  directions.routes[0].totalDuration = totalDuration;
  directions.routes[0].maxPassengerDuration = maxPassengerDuration;
  directions.routes[0].totalDistance = totalDistance;
  return directions;

}

var getWaypoints=function(consumers){
  var waypts = [];
  consumers.forEach(function(consumer) {
      waypts.push(consumer.address);
  });
  return waypts.join("|");
}
