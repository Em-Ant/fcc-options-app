'use strict';

var express = require('express');
var router = express.Router();
var Controller = require('../controllers/vehicleHandler.js');
var controller = new Controller();

var isLoggedIn = require('../auth/ensureAuth.js').isLoggedIn;

//router.post('/consumers/:v_id', isLoggedIn, controller.updateConsumersArray);
router.get('/', isLoggedIn, controller.index);

/**
optimize route
if query param ?origin='first' optimizes using the first consumer as origin
else origin is point-to-point farthest consumer from Options 
*/
router.get('/optimize-route/:id', isLoggedIn, controller.optimizeRoute)

router.get('/:id', isLoggedIn, controller.show);
router.post('/', isLoggedIn, controller.create);
router.post('/:id', isLoggedIn, controller.update);
router.patch('/:id',  isLoggedIn, controller.update);
router.put('/:id',  isLoggedIn, controller.update);
router.delete('/:id', isLoggedIn, controller.destroy);


module.exports = router;
