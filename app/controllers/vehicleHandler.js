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

  this.create = function(req, res) {

    //display validation errors and exit
    var errors = validateVehicle(req);
    if (errors) {
      //just display the first validation error
      return res.status(400).json(errors[0]);
    }

    //create a object from the request body
    var vehicle = new Vehicle(req.body);

    //look in the database to see if object already exists
    Vehicle.findOne({
      name: vehicle.name
    }, function(err, existingVehicle) {

      if (err) {
        return res.status(400).json({
          msg: 'There was an error finding vehicle'
        });
      }
      //if object exists, then exit
      if (existingVehicle) {
        return res.status(400).json({
          msg: 'A vehicle with that name already exists'
        });
      }
      //object doesn't exist, so put a new object in the database
      vehicle.save(function(err) {
        if (err) {
          return res.status(400).json({
            msg: 'There was an error saving vehicle'
          });
        }
        //return object if no error
        return res.status(200).json(vehicle);
      });
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

  // return a single vehicle
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

  //update a vehicle
  this.update = function(req, res) {
    if (req.body._id) {
      delete req.body._id;
    }

    //display validation errors and exit
    var errors = validateVehicle(req);

    if (errors) {
      //just display the first validation error
      return res.status(400).json(errors[0]);
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
          return res.status(400).json({
            msg: 'There was an error updating vehicle'
          });
        }
        return res.status(200).json(savedVehicle);
      });
    });
  }

  //delete a vehicle
  this.destroy = function(req, res) {
    var v_id = req.params.id;
    Vehicle.findById(v_id, function(err, vehicle) {
      if (err) {
        return res.status(400).json({
          msg: 'There was an error finding vehicle'
        });
      }
      if (!vehicle) {
        return res.status(400).json({
          msg: 'Could not find vehicle to delete'
        });
      }
      vehicle.remove(function(err) {
        if (err) {
          return res.status(400).json({
            msg: 'There was an error deleting vehicle'
          });
        }
        return res.status(200).json(v_id);
      });
    });
  }

  this.pullConsumer = function (req, res) {
    Vehicle.update(
      {_id: req.params.id},
      {$pull:{consumers: req.params.c_id}},
      function(err, status){
      if (err) {
        return res.status(400).json({
          msg: 'There was an error updating vehicle'
        });
      }
      return res.status(200).json(status);
    });
  }

  this.pushConsumer = function (req, res) {
    Vehicle.update(
      {_id: req.params.id},
      {$push:{consumers: req.params.c_id}},
      function(err, status){
      if (err) {
        return res.status(400).json({
          msg: 'There was an error updating vehicle'
        });
      }
      return res.status(200).json(status);
    });
  }
}

module.exports = VehicleHandler;
