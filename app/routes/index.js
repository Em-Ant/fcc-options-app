'use strict';

var path = process.cwd();

var UserHandler = require(path + '/app/controllers/userHandler.js');

module.exports = function(app, passport) {

  var userHandler = new UserHandler();

  app.use('/api/settings', require('./settingsRoute.js'));
  app.use('/api/consumer', require('./consumer.js'));
  app.use('/api/route', require('./route.js'));
  app.use('/api/vehicle', require('./vehicle.js'));

  app.route('/api/me')
    .get(function(req, res) {
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

  app.route('/api/logout')
    .get(function(req, res) {
      req.logout();
      res.json({});
    });

  app.route('/api/signup')
    .post(userHandler.signup);
  app.route('/api/login')
    .post(userHandler.login);

  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path + '/client/public/index.html');
    });
};
