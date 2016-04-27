'use strict';

var Vehicle = require('../models/vehicle.js');
var _ = require('lodash');


function VehicleHandler() {
  var getErrorMessage = function(err){
    //returns first error message
    var key = Object.keys(err.errors)[0];
    return err.errors[key].message;
  }

  this.create = function(req, res) {
    var vehicle = new Vehicle(req.body);

    vehicle.save(function(err) {
      if (err) {
        return res.status(400).json({
          msg: getErrorMessage(err)
        });
      }
      //return object if no error
      return res.status(200).json(vehicle);
     });
  }

  //return all vehicles
  this.index = function(req, res) {

    // if query param 'populate' === 'true' populate consumers refs
    if(req.query.populate === 'true') {
      console.log('ok');
      Vehicle.find({})
      .populate('consumers')
      .exec(function(err, vehicles) {
        if (err) {
          return res.status(400).json({
            msg: 'There was an error retrieving vehicles'
          });
        }
        return res.status(200).json(vehicles);
      });
    } else {
      // send consumers objectId
      Vehicle.find({}, '-__v', function(err, vehicles) {
        if (err) {
          return res.status(400).json({
            msg: 'There was an error retrieving vehicles'
          });
        }
        return res.status(200).json(vehicles);
      });
    }
  }

  this.show = function(req, res) {
    Vehicle.findById(req.params.id, function(err, vehicle) {
      if (err) {
        return res.status(500).json({
          msg: 'There was an error finding vehicle'
        });
      }
      if (!vehicle) {
        return res.status(404).json({
          msg: 'Vehicle not found'
        });
      }
      return res.status(200).json(vehicle);
    });
  }

  function updateVehicle(req, res) {
    Vehicle.findById(req.params.id, function(err, vehicle) {
      if (err) {
        return res.status(400).json({
          msg: 'There was an error finding vehicle'
        });
      }
      if (!vehicle) {
        return res.status(400).json({
          msg: 'Vehicle not found'
        });
      }
      var updated = Object.assign(vehicle, req.body);
      if(req.body.consumers){
        updated.markModified('consumers');
      }
      updated.save(function(err, savedVehicle) {
        if (err) {
          return res.status(400).json({
            msg: getErrorMessage(err)
          });
        }
        return res.status(200).json(savedVehicle);
      });
    });
  };

  this.update = function(req, res) {

    if (req.body._id) { delete req.body._id;}

    // there are version conflicts because we update the vehicle on every assignment
    // I have to remove __v from body, but we should avoid passing it around.
    delete req.body.__v;

    if (req.body.insert) {
      // if inserting a consumer, validate that is not already assigned
      var c_id = req.body.insert;
      delete req.body.insert;
      Vehicle.findOne({consumers: c_id}, function(err, vehicle){
        if(vehicle) {
          return res.status(400).json({
            msg: 'Consumer is already on a vehicle'
          });
        }

        if (err) {
          return res.status(400).json({
            msg: 'There was an error finding vehicles'
          });
        }
        // consumer is valid -> update vehicle
        updateVehicle(req, res);
      });
    } else {
      // not inserting a consumer -> update vehicle
      updateVehicle(req, res);
    }
  }

  //delete a vehicle
  this.destroy = function(req, res) {
    var v_id = req.params.id;
    Vehicle.findByIdAndRemove(v_id, function(err, vehicle) {
      if (err) {
        console.log(err);
        return res.status(400).json({
          msg: 'There was an error deleting vehicle'
        });
      }
      return res.status(200).json(v_id);
    });
  }
}

module.exports = VehicleHandler;
