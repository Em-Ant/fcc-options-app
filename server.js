'use strict';

var express = require('express');

var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var config = require('./app/config/config');

var app = express();

if (process.env.NODE_ENV !== 'production') require('dotenv').load();

require('./app/auth/passport')(passport);

mongoose.connect(process.env.MONGO_URI || process.env.MONGOLAB_URI, function(err){
  if(err){
      console.log('There was an error connecting to the database.');
      console.log(err);
      process.exit(0);
  }
});

if(process.env.SEED_DB && process.env.SEED_DB==="true") {
  require('./app/seed.js');
}
if(process.env.NODE_ENV == "development"){
  config.setHotReloading(app);
}

app.use(favicon(process.cwd() + '/client/public/img/favicon.ico'));
app.use('/', express.static(process.cwd() + '/client/public'));

app.use(session({
  secret: process.env.SECRET_SESSION || 'secretClementine',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('Node.js listening on port ' + port + '...');
});
