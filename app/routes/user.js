'use strict';

var express = require('express');
var router = express.Router();
var Controller = require('../controllers/userHandler.js');
var controller = new Controller();

var isLoggedIn = require('../auth/ensureAuth.js').isLoggedIn;
var hasRole = require('../auth/ensureAuth.js').hasRole;

//retrieves all users
router.get('/', hasRole('admin'), controller.index);

//check if loggedin and fetch current user
router.get('/me', function(req, res) {
  if (req.isAuthenticated()) {
    res.json({
      loggedIn: true,
      user: req.user.email,
      role: req.user.role
    });
  } else {
    res.json({
      loggedIn: false
    });
  }
});



//creates a new user (admin only)
router.post('/', hasRole('admin'), controller.create);

// reset password
router.post('/:id/reset-pwd', hasRole('admin'), controller.resetPassword);

// Update password
router.post('/password', isLoggedIn, controller.updatePassword);

//update an individual user
router.post('/:id', hasRole('admin'), controller.updateRole);
router.patch('/:id',  hasRole('admin'), controller.updateRole);


//delete a user
router.delete('/:id', hasRole('admin'), controller.destroy);


module.exports = router;
