'use strict';

var Vehicle = require('../models/vehicle.js');
var merge = require('lodash').merge;

function VehicleHandler() {
  var validateVehicle = function(req){
    //Validate input
    req.assert('name', 'Name must not be empty').notEmpty();
    req.assert('seats', 'Fixed seats must be a number').isInt();
    req.assert('flexSeats', 'Foldable seats must be a number').isInt();
    req.assert('wheelchairs', 'Wheelchair capacity must be a number').isInt();
    return req.validationErrors();
  }

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
      Vehicle.find(function(err, vehicles) {
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

  this.update = function(req, res) {

    if (req.body._id) {
      delete req.body._id;
    }
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
      var updated = merge(vehicle, req.body);
      updated.save(function(err, savedVehicle) {
        if (err) {
          console.log(err)
          return res.status(400).json({
            msg: getErrorMessage(err)
          });
        }
        return res.status(200).json(savedVehicle);
      });
    });
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

  var updateConsumers = function(vId, cArray, res) {
    console.log("updating consumers");
    Vehicle.update(
      // add new consumers array
      {_id: vId},
      {$set: {consumers: cArray}},
      { runValidators: true },
      function(err, status){
      if (err) {
        return res.status(400).json({
          msg: 'There was an error updating vehicle'
        });
      }
      return res.status(200).json(status);
    });
  }

  this.updateConsumersArray = function (req, res) {
    // remove from all other vehicles before assigning,
    // unfortunately this is not atomic ...
    console.log(req.params.v_id, req.body);
    var c_id = req.body.insert;
    if(c_id) {
      // insert

      Vehicle.update({}, {$pull:{consumers: req.c_id}}, function(err){
        // remove c_id from all other vehicles

        if (err) {
          return res.status(400).json({
            msg: 'There was an error updating vehicle'
          });
        }
        updateConsumers(req.params.v_id, req.body.consumers, res);
      })
    } else {
    // just remove
      updateConsumers(req.params.v_id, req.body.consumers, res);
    }
  }
}

module.exports = VehicleHandler;
