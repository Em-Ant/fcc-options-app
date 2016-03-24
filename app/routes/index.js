'use strict';

var path = process.cwd();

var UserHandler = require(path + '/app/controllers/userHandler.js');

module.exports = function(app, passport) {

  var isLoggedIn = require('./ensureAuth');

  var userHandler = new UserHandler();


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

  app.route('/logout')
    .get(function(req, res) {
      req.logout();
      res.redirect('/login');
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
