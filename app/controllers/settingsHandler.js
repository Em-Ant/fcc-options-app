'use strict';

var geocoder = require('../utils/geocoder.js');
var Settings = require('../models/settings.js');
var _ = require('lodash');

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

  function saveSettings(settings, res) {
    settings.save(function(err, savedSettings) {
      if (err) {
        return res.status(400).json({
          msg: 'There was an error updating settings'
        });
      }
      return res.status(200).json(savedSettings);
    });
  }


  function updateSettings(settings, newSettings, res) {
    var updated = _.assign(settings, newSettings);
    updated.save(function(err, savedSettings) {
      if (err) {
        return res.status(400).json({
          msg: 'There was an error updating settings'
        });
      }
      return res.status(200).json(savedSettings);
    })
  }


  this.update = function(req, res) {
    var errors = validate(req);
    if (errors) {
      return res.status(400).json(errors[0]);
    }

    var newSettings = req.body;
    //update fails if id is left on
    if (newSettings._id) {
      delete newSettings._id;
    }

    //get settings
    Settings.findOne({}, function(err, settings) {
      if (!settings) {
        //no settings in the system
        return geocoder.getCoords(newSettings.optionsIncAddress, function(err, coords) {

          if (err || !coords) {
            return res.status(400).json({
              msg: 'Could not get coordinates of address'
            });
          }
          newSettings.optionsIncCoords = coords;
          var validSettings = new Settings(newSettings);
          return saveSettings(validSettings, res);
        });

      }

      if (settings.optionsIncAddress == newSettings.optionsIncAddress) {
        //don't geocode address
        return updateSettings(settings, newSettings, res);
      }
      //geocode address, then save
      geocoder.getCoords(newSettings.optionsIncAddress, function(err, coords) {
        if (err || !coords) {
          return res.status(400).json({
            msg: 'Could not get coordinates of address'
          });
        }
        newSettings.optionsIncCoords = coords;
        return updateSettings(settings, newSettings, res);
      });

    })

  }
}

module.exports = SettingsHandler;
