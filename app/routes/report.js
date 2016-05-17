'use strict';

var express = require('express');
var router = express.Router();
var Controller = require('../controllers/reportHandler.js');
var controller = new Controller();

var isLoggedIn = require('../auth/ensureAuth.js').isLoggedIn;

//retrieves all routes
router.get('/vehicles', isLoggedIn, controller.vehiclesReport);
router.get('/consumers', isLoggedIn, controller.consumersReport);
router.get('/directions/:v_id', isLoggedIn, controller.getDocxDirections);


module.exports = router;
