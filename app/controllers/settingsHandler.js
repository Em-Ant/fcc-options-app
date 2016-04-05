'use strict';

var geocoderProvider = 'google';
var httpAdapter = 'http';
var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter);
var Settings = require('../models/settings.js');

function SettingsHandler() {
  var validate = function(req) {
    //Validate input
    req.assert('optionsIncAddress', 'Address must not be empty').notEmpty();
    req.assert('maxPassengersPerVehicle', 'Max passengers seats must not be empty').notEmpty();
    req.assert('maxConsumerRouteTime', 'Max route time must not be empty').notEmpty();
    req.assert('maxPassengersPerVehicle', 'Max passengers seats must be a number').isInt();
    req.assert('maxConsumerRouteTime', 'Max route time must be a number').isInt();

    return req.validationErrors();
  }

  this.index = function(req, res) {
    Settings.findOne({}, function(err, settings) {
      if (err) {
        return res.status(400).json({
          msg: 'There was an error retrieving settings'
        });
      }
      return res.status(200).json(settings);
    });
  }


  this.update = function(req, res) {
    var errors = validate(req);

    if (errors) {
      return res.status(400).json(errors[0]);
    }

    req.body.id=null;
    var settings = req.body;
    getCoords(settings.optionsIncAddress, function(err, coords) {
      if (err || !coords) {
        return res.status(400).json({
          msg: 'Could not get coordinates of address'
        });
      }
      settings.optionsIncCoords = coords;
      Settings.findOneAndUpdate({}, settings, {
        upsert: true,
        new: true
      }, function(err, updatedSettings) {
        if (err) {
          return res.status(400).json({
            msg: 'There was an error updating settings'
          });
        }
        return res.status(200).json(updatedSettings);
      });
    });

  }

  var getCoords = function(address, done) {
    geocoder.geocode(address, function(err, res) {
      if(err){
        return done(err);
      }
      if(!res.length)
      {
        //no results returned
        return done(null, null);
      }
      var coords ={
        lat:res[0].latitude,
        lon:res[0].longitude
      }
      done(null, coords);
    });


  }
}

module.exports = SettingsHandler;
