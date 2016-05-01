
function deg2rad(deg) {
  return deg * Math.PI / 180;
}

module.exports = function(pos1, pos2) {
  var lat1 = pos1.lat;
  var lon1 = pos1.lng;
  var lat2 = pos2.lat;
  var lon2 = pos2.lng;

  /*
  Calculate distance between two coord points, on a spherical surface.
  phi is latitude, lambda is longitude, R is earth’s radius (mean radius = 6,371km);
  note that angles need to be in radians to pass to trig functions!
  */

  var R = 6371000; // metres
  var phi1 = deg2rad(lat1);
  var phi2 = deg2rad(lat2);
  var deltaPhi = deg2rad(lat2-lat1);
  var deltaLambda = deg2rad(lon2-lon1);

  var a = Math.sin(deltaPhi/2) * Math.sin(deltaPhi/2) +
          Math.cos(phi1) * Math.cos(phi2) *
          Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var distance = R * c;

  return distance;
}
