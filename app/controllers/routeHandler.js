'use strict';

var Route = require('../models/routes.js');
var merge = require('lodash').merge;

function RouteHandler() {
  function handleError(res, message) {
    return res.status(500).json({msg: message});
  };

  this.create = function(req, res) {
    //Validate input
    req.assert('name', 'Name must not be empty').notEmpty();
    req.assert('locationServed', 'Location served must not be empty').notEmpty();

    //display validation errors and exit
    var errors = req.validationErrors();
    if (errors) {
      //just display the first validation error
      return res.status(400).json(errors[0]);
    }

    //create a new route from the request body
    var route = new Route(req.body);

    //look in the database to see if a user already exists
    Route.findOne({
      name: route.name
    }, function(err, existingRoute) {

      if (err) {
        return res.status(400).json({
          msg: 'There was an error finding route'
        });
      }
      //if route exists, then exit
      if (existingRoute) {
        return res.status(400).json({
          msg: 'A route with that name already exists'
        });
      }
      //route doesn't exist, so put a new route in the database
      route.save(function(err) {
        if (err) {
          return res.status(400).json({
            msg: 'There was an error saving route'
          });
        }
        //return name if no error
        return res.tatus(200).json(route.name);
      });
    });
  }

  //return all routes
  this.index = function(req, res) {
    Route.find(function(err, routes) {
      if (err) {
        return res.status(400).json({
          msg: 'There was an error retrieving routes'
        });
      }
      return res.status(200).json(routes);
    });
  }

  // return a single route
  this.show = function(req, res) {
    Route.findById(req.params.id, function(err, route) {
      if (err) {
        return res.status(500).json({
          msg: 'There was an error finding route'
        });
      }
      if (!route) {
        return res.status(404).json({
          msg: 'Route not found'
        });
      }
      return res.status(200).json(route);
    });
  }

  //update a route
  this.update = function(req, res) {
    // TODO why delete _id?  shouldn't the _id still be the same?
    // if (req.body._id) {
    //   delete req.body._id;
    // }

    //Validate input
    req.assert('name', 'Name must not be empty').notEmpty();
    req.assert('locationServed', 'Location served must not be empty').notEmpty();

    //display validation errors and exit
    var errors = req.validationErrors();
    if (errors) {
      //just display the first validation error
      return res.status(400).json(errors[0]);
    }

    Route.findById(req.params.id, function(err, route) {
      if (err) {
        return res.status(400).json({
          msg: 'There was an error finding route'
        });
      }
      if (!route) {
        return res.status(400).json({
          msg: 'Route not found'
        });
      }
      var updated = merge(route, req.body);
      updated.save(function(err) {
        if (err) {
          return res.status(400).json({
            msg: 'There was an error updating route'
          });
        }
        return res.status(200).json(route);
      });
    });
  }

  //delete a route
  this.destroy = function(req, res) {
    Route.findById(req.params.id, function(err, route) {
      if (err) {
        return res.status(400).json({
          msg: 'There was an error finding route'
        });
      }
      if (!route) {
        return res.status(400).json({
          msg: 'Could not find route to delete'
        });
      }
      route.remove(function(err) {
        if (err) {
          return res.status(400).json({
            msg: 'There was an error deleting route'
          });
        }
        return res.status(200).json({});
      });
    });
  }

}

module.exports = RouteHandler;
