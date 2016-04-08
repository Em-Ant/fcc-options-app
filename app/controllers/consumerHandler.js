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

  function handleError(res, err) {
    return res.status(500).send(err);
  };

  this.index = function(req,res) {
    Consumer.find(function (err, consumers) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(consumers);
    });
  }

  this.show = function(req,res) {
    Consumer.findById(req.params.id, function (err, consumer) {
      if(err) { return handleError(res, err); }
      if(!consumer) { return res.status(404).send('Not Found'); }
      return res.json(consumer);
    });
  }

  function createConsumer(consumer, res){
    Consumer.create(consumer, function(err, addedConsumer) {
        if(err) { return handleError(res, err); }
        return res.status(201).json(addedConsumer);
    });
  }
  this.create = function(req,res) {
    var consumer = req.body;
    //get coordinates for the address

    geocoder.getCoords(consumer.address, function(err, coords){
      if(err) { return handleError(res, err); }
      //geocoder could not get coords for address
      if(!coords){
        return res.status(404).send('Invalid Address');
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
      if (err) { return handleError(res, err); }
      if(!consumer) { return res.status(404).send('Not Found'); }
      if (consumer.address !== req.body.address) {
        // address has been modified: new geo-location is needed
        var updated = merge(consumer, req.body);
        geocoder.getCoords(updated.address, function(err, coords){
          if(err) { return handleError(res, err); }
          // geocoder could not get coords for address
          if(!coords){
            return res.status(404).send('Invalid Address');
          }
          // set the coords to the consumer
          updated.position = coords;
          updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.status(200).json(updated);
          });
        });
      } else {
        // normally update the consumer
        var updated = merge(consumer, req.body);
        updated.save(function (err) {
          if (err) { return handleError(res, err); }
          return res.status(200).json(updated);
        });
      }

    });
  }

  this.destroy = function(req,res) {
    Consumer.findById(req.params.id, function (err, consumer) {
      if(err) { return handleError(res, err); }
      if(!consumer) { return res.status(404).send('Not Found'); }
      consumer.remove(function(err) {
        if(err) { return handleError(res, err); }
        return res.status(200).json({status: 'delete ok'});
      });
    });
  }
}

module.exports = ConsumerHandler;
