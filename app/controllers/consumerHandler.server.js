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

  this.create = function(req,res) {
    Consumer.create(req.body, function(err, consumer) {
        if(err) { return handleError(res, err); }
        return res.status(201).json(consumer);
    });
  }

  this.update = function(req,res) {
    if(req.body._id) { delete req.body._id; }
    Consumer.findById(req.params.id, function (err, consumer) {
      if (err) { return handleError(res, err); }
      if(!consumer) { return res.status(404).send('Not Found'); }
      var updated = merge(consumer, req.body);
      updated.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(consumer);
      });
    });
  }

  this.destroy = function(req,res) {
    Consumer.findById(req.params.id, function (err, consumer) {
      if(err) { return handleError(res, err); }
      if(!consumer) { return res.status(404).send('Not Found'); }
      consumer.remove(function(err) {
        if(err) { return handleError(res, err); }
        return res.status(204).send('No Content');
      });
    });
  }
}

module.exports = ConsumerHandler;
