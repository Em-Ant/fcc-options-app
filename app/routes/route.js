'use strict';

var express = require('express');
var router = express.Router();
var Controller = require('../controllers/routeHandler.js');
var controller = new Controller();

var isLoggedIn = require('../auth/ensureAuth.js').isLoggedIn;

//retrieves all routes
router.get('/', isLoggedIn, controller.index);
//retrieve a single route
router.get('/:id', isLoggedIn, controller.show);
//creates a route
router.post('/', isLoggedIn, controller.create);
//update an individual route
router.post('/:id', isLoggedIn, controller.update);
router.patch('/:id',  isLoggedIn, controller.update);
//delete a route
router.delete('/:id', isLoggedIn, controller.destroy);

module.exports = router;
