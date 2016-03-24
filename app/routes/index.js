'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var UserHandler = require(path + '/app/controllers/userHandler.server.js');
var RouteHandler = require(path + '/app/controllers/routeHandler.server.js');


module.exports = function(app, passport) {

  var isLoggedIn = require('./ensureAuth');

  var clickHandler = new ClickHandler();
  var userHandler = new UserHandler();
  var routeHandler = new RouteHandler();


  app.use('/api/consumer', require('./consumer.js'));
  app.use('/api/route', require('./route.js'));

  app.route('/api/user')
    .get(function(req, res) {
      console.log("api user");
      if (req.user) {
        res.json(req.user);
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

  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path + '/client/public/index.html');
    });
};
