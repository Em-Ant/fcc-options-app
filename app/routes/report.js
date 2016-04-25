'use strict';

var express = require('express');
var router = express.Router();
var Controller = require('../controllers/reportHandler.js');
var controller = new Controller();

var isLoggedIn = require('../auth/ensureAuth.js').isLoggedIn;

//retrieves all routes
router.get('/', isLoggedIn, controller.report);


module.exports = router;
