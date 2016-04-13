
var directionsService = new google.maps.DirectionsService;



module.exports.getDirections= function(vehicle, consumers,origin, destination, done){
  var morningConsumersIds = vehicle.consumers;
  var morningWaypoints= getWaypoints(morningConsumersIds, consumers);
  var eveningConsumerIds = vehicle.consumers.slice().reverse();
  var eveningWaypoints= getWaypoints(eveningConsumerIds, consumers);
  getWaypointDirections(morningWaypoints, origin, destination, function(err, response){
    if(err){
      return done(err);
    }
    response = addAppDataToDirections(response, morningConsumersIds, consumers);

    //TODO fix this nesting
    getWaypointDirections(eveningWaypoints, origin, destination, function(err, eveningResponse){
      if(err){
        return done(err);
      }
      eveningResponse = addAppDataToDirections(eveningResponse, eveningConsumerIds, consumers);
      response.routes[1] = eveningResponse.routes[0];
      console.log(response);
      return done(null, response);
    });
  });
}

function getWaypointDirections(waypoints, origin, destination, done){
  directionsService.route({
    origin: origin,
    destination: destination,
    waypoints: waypoints,
    optimizeWaypoints: false,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
      if (status !== google.maps.DirectionsStatus.OK) {
        return done('Directions request failed due to ' + status);
      }
      done(null, response);
    }
  );
}

function addAppDataToDirections(directions, c_ids, consumers){
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
      var c_id = c_ids[index-1];
      var consumer = consumers[c_id];
      leg.start_location_name=consumer.name;
    }
    if(index == legs.length - 1){
      leg.end_location_name = "Options Inc.";
    }else{
      var c_id = c_ids[index];
      var consumer = consumers[c_id];
      leg.end_location_name=consumer.name;
    }
  })
  directions.routes[0].totalDuration = totalDuration;
  directions.routes[0].maxPassengerDuration = maxPassengerDuration;
  directions.routes[0].totalDistance = totalDistance;
  return directions;

}

var getWaypoints=module.exports.getWaypoints=function(c_ids, consumers){
  var waypts = [];
  c_ids.forEach(function(c_id) {
    var consumer = consumers[c_id];
    waypts.push({location: consumer.address, stopover: true});
  });
  return waypts;
}
