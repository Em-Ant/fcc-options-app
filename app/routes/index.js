'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var UserHandler = require(path + '/app/controllers/userHandler.server.js');


module.exports = function(app, passport) {

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.json({
        status: 'forbidden'
      });
    }
  }

  var clickHandler = new ClickHandler();
  var userHandler = new UserHandler();


  app.route('/api/user')
    .get(function(req, res) {
      if (req.user && req.user.twitter) {
        res.json(req.user.twitter);
      } else {
        res.json({
          unauth: true
        });
      }

    });

  app.route('/auth/twitter')
    .get(passport.authenticate('twitter'));


  app.route('/auth/twitter/callback')
    .get(passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));

  app.route('/logout')
    .get(function(req, res) {
      req.logout();
      res.redirect('/login');
    });

  app.route('/api/user/clicks')
    .get(isLoggedIn, clickHandler.getClicks)
    .post(isLoggedIn, clickHandler.addClick)
    .delete(isLoggedIn, clickHandler.resetClicks);

  app.route('/api/signup')
    .post(userHandler.signup);
  app.route('/api/login')
    .post(userHandler.login);

  // app.route('/api/route')
  //   .post(isLoggedIn, routeHandler.addRoute);

  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path + '/client/public/index.html');
    });
};
