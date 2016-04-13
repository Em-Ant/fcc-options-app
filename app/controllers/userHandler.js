'use strict';

var User = require('../models/users.js');
var passport = require('passport');
var mongoose = require('mongoose');
require('../auth/passport')(passport);

function UserHandler() {
  this.getUser = function(req, res) {
      if (!req.params || !req.params.userId) {
        return res.status(400).json({
          error: "An error occurred"
        });
      }
      var userId = req.params.userId;
      User.findOne({
          _id: userId
        })
        .exec(function(err, user) {
          if (err) {
            console.log("An error occurred", err);
            return res.status(400).json({
              error: "An error occurred"
            });
          }
          return res.json(user);
        });

    },
    this.getLoggedInUser = function(req, res) {
        if (!req.params || !req.params.userId) {
          return res.status(400).json({
            error: "An error occurred"
          });
        }
        var userId = req.params.userId;
        User.findOne({
            _id: userId
          })
          .exec(function(err, user) {
            if (err) {
              console.log("An error occurred", err);
              return res.status(400).json({
                error: "An error occurred"
              });
            }
            return res.json(user);
          });

      },

  /*
  Create a new User with default password (admin only)
  */
  this.create = function(req, res) {
    console.log(req.body);
    //Validate input
    req.assert('email', 'Email is not valid').isEmail();


    //display validation errors and exit
    var errors = req.validationErrors();
    if (errors) {
      return res.status(400).json(errors[0]);
    }

    console.log(req.body);
    //create a new user from the request body, with default password
    req.body.password = 'default'
    var user = new User (req.body);

    //look in the database to see if a user already exists
    User.findOne({
      email: user.email
    }, function(err, existingUser) {

      //if user exists, then exit
      if (existingUser) {
        return res.status(400).json({
          msg: 'Account with that email address already exists.'
        });
      }
      //user doesn't exist, so put a new user in the database
      user.save(function(err) {
        if (err) {
          return res.status(400).json({
            msg: 'There was an error saving user'
          });
        }
        //return email if no error
        return res.json({email: user.email, role: user.role});
      });
    });
  }

  // List all users (admin only)
  this.index = function(req, res) {
    User.find({},'-password', function(err, users){
      if (err) {
        return res.status(400).json({
          msg: 'Error fetching users'
        })
      }
      return res.status(200).json(users);
    })
  }

  this.destroy = function(req, res) {
    User.findById(req.params.id, function(err, route) {
      if (err) {
        return res.status(400).json({
          msg: 'There was an error finding user'
        });
      }
      if (!route) {
        return res.status(400).json({
          msg: 'Could not find user to delete'
        });
      }
      route.remove(function(err) {
        if (err) {
          return res.status(400).json({
            msg: 'There was an error deleting user'
          });
        }
        return res.status(200).json({});
      });
    });
  }

  this.updateRole = function(req, res) {
    User.find({_id: req.params.id}, function(err, user) {
      if (err) {
        return res.status(400).json({
          msg: 'Error finding User to update'
        });
      }
      var updated = Object.assign({}, user);
      updated.role = req.body.role;
      updated.save(function(err) {
        if (err) {
          return res.status(400).json({
            msg: 'Error saving updated user'
          });
        }
        delete updated.password;
        console.log(updated)
        return res.status(200).json(updated);
      })
    })
  }

  this.updatePassword = function(req, res) {
    // TODO
  }
  //
  //   this.updateUser = function(req, res, next) {
  //     console.log("updating user", req.body._id);
  //
  //     User.findOne({
  //       _id: mongoose.Types.ObjectId(req.body._id)
  //     }, function(err, existingUser) {
  //       //check if user is in database
  //       console.log("found user", existingUser);
  //       if (existingUser) {
  //         //merge changes into existing user
  //
  //         var updatedUser = assign(existingUser, req.body);
  //         updatedUser.save(function(err) {
  //           if (err) {
  //             return res.status(400).json({
  //               msg: 'There was an error saving user'
  //             });
  //           }
  //           return res.json(updatedUser);
  //         });
  //       }
  //       else {
  //         //could not find user to update in db
  //         return res.status(400).json({
  //           msg: 'There was an error saving user'
  //         });
  //       }
  //
  //
  //     });
  //
  //
  //   }
  //
  //
  /**
   * POST /login
   * Sign in using email and password.
   */
  this.login = function(req, res, next) {
    console.log(req.body);
    // field validation
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password cannot be blank').notEmpty();

    var errors = req.validationErrors();

    //exit if there are validation errors
    if (errors) {
      return res.status(400).json(errors[0]);
    }

		//authenticate user
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        console.error(err);
        return next(err);
      }

      if (!user) {
        console.error({
          msg: info.message
        });
        return res.status(400).json({
          msg: info.message
        });
      }

      req.logIn(user, function(err) {
        if (err) {
          console.error(err);
          return next(err);
        }
        return res.json({
          loggedIn: true,
          user: user.email,
          role: user.role
        });
      });
    })(req, res, next);
  };
}

module.exports = UserHandler;
