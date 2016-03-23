'use strict';

var express = require('express');
var router = express.Router();
var Controller = require('../../controllers/consumerHandler.server.js');
var controller = new Controller();

var isLoggedIn = require('../ensureAuth.js');

router.get('/', isLoggedIn, controller.index);
router.get('/:id', isLoggedIn, controller.show);
router.post('/', isLoggedIn, controller.create);
router.put('/:id', isLoggedIn, controller.update);
router.patch('/:id', isLoggedIn, controller.update);
router.delete('/:id', isLoggedIn, controller.destroy);

module.exports = router;
