'use strict';

var express = require('express');
var router = express.Router();
var Controller = require('../controllers/vehicleHandler.js');
var controller = new Controller();

var isLoggedIn = require('../auth/ensureAuth.js').isLoggedIn;

//router.post('/:id/push/:c_id', isLoggedIn, controller.pushConsumer);
router.post('/:id/pull/:c_id', isLoggedIn, controller.pullConsumer);
router.get('/', isLoggedIn, controller.index);
router.get('/:id', isLoggedIn, controller.show);
router.post('/', isLoggedIn, controller.create);
router.patch('/:id',  isLoggedIn, controller.update);
router.put('/:id',  isLoggedIn, controller.update);
router.delete('/:id', isLoggedIn, controller.destroy);


module.exports = router;
