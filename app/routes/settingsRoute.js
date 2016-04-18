'use strict';

var express = require('express');
var router = express.Router();
var Controller = require('../controllers/settingsHandler.js');
var controller = new Controller();

var isLoggedIn = require('../auth/ensureAuth.js').isLoggedIn;

router.get('/', isLoggedIn, controller.index);
router.put('/:id', isLoggedIn, controller.update);

module.exports = router;
