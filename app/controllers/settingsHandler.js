'use strict';

var geocoder = require('../utils/geocoder.js');
var Settings = require('../models/settings.js');
var Vehicle = require('../models/vehicle.js');
var Directions = require('../models/directions.js');
var _ = require('lodash');

var async = require("async");

function SettingsHandler() {

  var getErrorMessage = function(err) {
    //returns first error message
    var key = Object.keys(err.errors)[0];
    return err.errors[key].message;
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
    async.parallel([
      function(callback) {
        Vehicle.update({}, {maxPassengerDuration: undefined, optimized: undefined},
          {multi: true},
          function(err, stat) {
            callback(err, stat)
        })
      },
      function (callback) {
        Directions.find({}).remove(function(err, stat) {
          callback(err, stat);
        });
      }
    ], function(err, results) {
      if (err) {
        return res.status(400).json({
          msg: 'Could preform settings pre-save tasks'
        });
      }
      settings.save(function(err, savedSettings) {
        if (err) {
          return res.status(400).json({
            msg: getErrorMessage(err)
          });
        }
        return res.status(200).json(savedSettings);
      });
    })
  }

  this.update = function(req, res) {
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

        var updated = _.assign(settings, newSettings);
        return saveSettings(updated, res);
      }
      //geocode address, then save
      geocoder.getCoords(newSettings.optionsIncAddress, function(err, coords) {
        if (err || !coords) {
          return res.status(400).json({
            msg: 'Could not get coordinates of address'
          });
        }
        newSettings.optionsIncCoords = coords;
        var updated = _.assign(settings, newSettings);
        return saveSettings(updated, res);
      });

    })

  }
}

module.exports = SettingsHandler;
