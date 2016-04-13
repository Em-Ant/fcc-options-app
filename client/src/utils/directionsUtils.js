
var directionsService = new google.maps.DirectionsService;



module.exports.getDirections= function(vehicle, consumers,origin, destination, done){
  var waypoints= getWaypoints(vehicle, consumers);
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
      //inject waypoint names
      var legs = response.routes[0].legs;
      legs.forEach(function(leg,index){
        if(index == 0){
          leg.start_location_name = "Options Inc.";
        }else{
          var c_id = vehicle.consumers[index-1];
          var consumer = consumers[c_id];
          leg.start_location_name=consumer.name;
        }
        if(index == legs.length - 1){
          leg.end_location_name = "Options Inc.";
        }else{
          var c_id = vehicle.consumers[index];
          var consumer = consumers[c_id];
          leg.end_location_name=consumer.name;
        }
      })
      done(null, response);
    }
  );
}

var getWaypoints=module.exports.getWaypoints=function(vehicle, consumers){
  var waypts = [];
  vehicle.consumers.forEach(function(c_id) {
    var consumer = consumers[c_id];
    waypts.push({location: consumer.address, stopover: true});
  });
  return waypts;
}
