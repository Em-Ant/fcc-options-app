'use strict';

var User = require('../models/users.js');
var passport = require('passport');
var mongoose = require('mongoose');
require('../auth/passport')(passport);

function UserHandler() {
  // this.getUser = function(req, res) {
  //     if (!req.params || !req.params.userId) {
  //       return res.status(400).json({
  //         error: "An error occurred"
  //       });
  //     }
  //     var userId = req.params.userId;
  //     User.findOne({
  //         _id: userId
  //       })
  //       .exec(function(err, user) {
  //         if (err) {
  //           console.log("An error occurred", err);
  //           return res.status(400).json({
  //             error: "An error occurred"
  //           });
  //         }
  //         return res.json(user);
  //       });
  //
  //   },

  /*
  Signs up a new user
  */
  this.signup = function(req, res, next) {
    console.log(req.body);
    //Validate input
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

    //display validation errors and exit
    var errors = req.validationErrors();
    if (errors) {
      return res.status(400).json(errors[0]);
    }

    //create a new user from the request body
    var user = new User(req.body);

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
        return res.json(user.email);
      });
    });


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
        //output the email when login is successful
        return res.json(user.email);
      });
    })(req, res, next);
  };
}

module.exports = UserHandler;
