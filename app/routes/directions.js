'use strict';

var express = require('express');
var router = express.Router();
var Controller = require('../controllers/directionsHandler.js');
var controller = new Controller();
var isLoggedIn = require('../auth/ensureAuth.js').isLoggedIn;

router.get('/:id', isLoggedIn, controller.index);
router.put('/:id', isLoggedIn, controller.update);

module.exports = router;
