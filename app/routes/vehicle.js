'use strict';

var express = require('express');
var router = express.Router();
var Controller = require('../controllers/vehicleHandler.js');
var controller = new Controller();

var isLoggedIn = require('../auth/ensureAuth.js').isLoggedIn;

router.post('/consumers/:v_id', isLoggedIn, controller.updateConsumersArray);
router.get('/', isLoggedIn, controller.index);
router.get('/:id', isLoggedIn, controller.show);
router.post('/', isLoggedIn, controller.create);
router.patch('/:id',  isLoggedIn, controller.update);
router.put('/:id',  isLoggedIn, controller.update);
router.delete('/:id', isLoggedIn, controller.destroy);


module.exports = router;
