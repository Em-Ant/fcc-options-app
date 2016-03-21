'use strict';

var TwitterStrategy = require('passport-twitter').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');
var configAuth = require('./auth');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy({
      usernameField: 'email'
    },
    function(email, password, done) {
      User.findOne({
        email: email
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: 'Email not found'
          });
        }
        user.comparePassword(password, function(err, isMatch) {
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: 'Invalid password.'
            });
          }
        });
      });
    }
  ));
	//
  // passport.use(new TwitterStrategy({
  //     consumerKey: configAuth.twitterAuth.consumerKey,
  //     consumerSecret: configAuth.twitterAuth.consumerSecret,
  //     callbackURL: configAuth.twitterAuth.callbackURL
  //   },
  //   function(token, refreshToken, profile, done) {
  //     process.nextTick(function() {
  //       User.findOne({
  //         'twitter.id': profile.id
  //       }, function(err, user) {
  //         if (err) {
  //           return done(err);
  //         }
	//
  //         if (user) {
  //           return done(null, user);
  //         } else {
  //           var newUser = new User();
	//
  //           newUser.twitter.id = profile.id;
  //           newUser.twitter.username = profile.username;
  //           newUser.twitter.displayName = profile.displayName;
  //           newUser.nbrClicks.clicks = 0;
	//
  //           newUser.save(function(err) {
  //             if (err) {
  //               throw err;
  //             }
	//
  //             return done(null, newUser);
  //           });
  //         }
  //       });
  //     });
  //   }));
};
