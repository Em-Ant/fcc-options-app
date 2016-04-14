'use strict';

var path = process.cwd();

var UserHandler = require(path + '/app/controllers/userHandler.js');

module.exports = function(app, passport) {

  var userHandler = new UserHandler();

  app.use('/api/settings', require('./settingsRoute.js'));
  app.use('/api/consumer', require('./consumer.js'));
  app.use('/api/route', require('./route.js'));
  app.use('/api/vehicle', require('./vehicle.js'));
  app.use('/api/user', require('./user.js'));
  app.use('/api/directions', require('./directions.js'));

  app.route('/api/logout')
    .get(function(req, res) {
      req.logout();
      res.json({});
    });

  app.route('/api/login')
    .post(userHandler.login);

  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path + '/client/public/index.html');
    });
};
