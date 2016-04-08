'use strict';
var geocoderProvider = 'google';
var httpAdapter = 'http';
var nodeGeocoder = require('node-geocoder')(geocoderProvider, httpAdapter);


module.exports.getCoords = function(address, done) {
  nodeGeocoder.geocode(address, function(err, res) {
    if (err) {
      return done(err);
    }
    if (!res.length) {
      //no results returned
      return done(null, null);
    }
    var coords = {
      lat: res[0].latitude,
      lng: res[0].longitude
    }
    done(null, coords);
  });
};
