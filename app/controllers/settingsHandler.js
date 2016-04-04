'use strict';

var Settings = require('../models/settings.js');

function SettingsHandler() {
  var validate = function(req){
    //Validate input
    return req.validationErrors();
  }

  this.index = function(req, res) {
    Settings.findOne({}, function(err, settings){
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
    Settings.findOneAndUpdate({}, req.body, {upsert:true}, function(err, updatedSettings){
        if (err) {
          return res.status(400).json({
            msg: 'There was an error updating settings'
          });
        }
        return res.status(200).json(updatedSettings);
    });
  }


}

module.exports = SettingsHandler;
