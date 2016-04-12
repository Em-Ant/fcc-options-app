
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
