	/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var Consumer = require('../models/consumer');
var merge = require('lodash').merge;
var geocoder = require('../utils/geocoder.js');

function ConsumerHandler () {

  var getErrorMessage = function(err) {
    //returns first error message
    var key = Object.keys(err.errors)[0];
    return err.errors[key].message;
  }

  this.index = function(req,res) {
    Consumer.find({}, null, {sort: 'createdAt'}, function (err, consumers) {
      if(err) { return res.status(400).json({msg: 'Error retrieving consumers'}); }
      return res.status(200).json(consumers);
    });
  }

  this.show = function(req,res) {
    Consumer.findById(req.params.id, function (err, consumer) {
      if(err) { return handleError(res, err); }
      if(!consumer) { return res.status(404).json({msg: 'Consumer Not Found'});}
      return res.json(consumer);
    });
  }

  function createConsumer(consumer, res){
    Consumer.create(consumer, function(err, addedConsumer) {
        if(err) {
          console.log(err);
          return res.status(400).json({
            msg: getErrorMessage(err)
          });
        }
        return res.status(201).json(addedConsumer);
    });
  }
  this.create = function(req,res) {
    //Validate input
    req.assert('name', 'Name must not be empty').notEmpty();
    req.assert('sex', 'Sex must not be empty').notEmpty();

    //display validation errors and exit
    var errors = req.validationErrors();
    if (errors) {
      //just display the first validation error
      return res.status(400).json(errors[0]);
    }

    var consumer = req.body;
    //get coordinates for the address

    geocoder.getCoords(consumer.address, function(err, coords){
      if(err) { return handleError(res, err); }
      //geocoder could not get coords for address
      if(!coords){
        return res.status(404).json({msg: 'Invalid Address'});
      }
      //set the coords to the consumer
      consumer.position = coords;
      createConsumer(consumer, res);
    });
  }

  // TODO call back hell.  Couldn't find a good way to refactor this.
  // maybe use async.js?
  this.update = function(req,res) {
    if(req.body._id) { delete req.body._id; }
    Consumer.findById(req.params.id, function (err, consumer) {
      if (err) { return res.status(400).json({msg: 'Error retrieving consumer'});}
      if(!consumer) { return res.status(404).json({msg: 'Consumer cannot be found'});}
      if (consumer.address !== req.body.address) {
        // address has been modified: new geo-location is needed
        var updated = merge(consumer, req.body);
        geocoder.getCoords(updated.address, function(err, coords){
          if(err) { return handleError(res, err); }
          // geocoder could not get coords for address
          if(!coords){
            return res.status(404).json({msg: 'Invalid Address'});
          }
          // set the coords to the consumer
          updated.position = coords;
          updated.save(function (err) {
            if (err) {
              return res.status(400).json({
                msg: getErrorMessage(err)
              });
            }
            return res.status(200).json(updated);
          });
        });
      } else {
        // normally update the consumer
        var updated = merge(consumer, req.body);
        updated.save(function (err) {
          if (err) {
            return res.status(400).json({
              msg: getErrorMessage(err)
            });
          }
          return res.status(200).json(updated);
        });
      }

    });
  }

  this.destroy = function(req,res) {
    Consumer.findById(req.params.id, function (err, consumer) {
      if(err) { return res.status(400).json({msg: 'Error retrieving consumer'});}
      if(!consumer) { return res.status(404).json({msg: 'Consumer cannot be found'});}
      consumer.remove(function(err) {
        if(err) { return res.status(400).json({msg: 'Error deleting consumer'}) }
        return res.status(200).json({status: 'delete ok'});
      });
    });
  }
}

module.exports = ConsumerHandler;
