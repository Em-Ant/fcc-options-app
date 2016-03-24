'use strict';

var express = require('express');
var router = express.Router();
var Controller = require('../controllers/routeHandler.server.js');
var controller = new Controller();

router.get('/', controller.index);
router.post('/', controller.create);

module.exports = router;
