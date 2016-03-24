'use strict';

var Route = require('../models/routes.js');

function RouteHandler() {

  this.create = function(req, res) {
    //Validate input
    req.assert('name', 'Name must not be empty').notEmpty();
    req.assert('locationServed', 'Location served must not be empty').notEmpty();

    //display validation errors and exit
    var errors = req.validationErrors();
    if (errors) {
      return res.status(400).json(errors[0]);
    }

    //create a new route from the request body
    var route = new Route(req.body);

    //look in the database to see if a user already exists
    Route.findOne({
      name: route.name
    }, function(err, existingRoute) {

      if(err){
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
        return res.json(route.name);
      });
    });
  }


  this.index = function(req,res) {
    Route.find(function (err, routes) {
        if (err) {
          return res.status(400).json({
            msg: 'There was an error retrieving routes'
          });
        }
      return res.status(200).json(routes);
    });
  }

}

module.exports = RouteHandler;
