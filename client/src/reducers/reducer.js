var vehicleRoutes =require('./vehicleRoutesReducer');
var vehiclesPage =require('./vehicleReducer');
var consumersPage = require('./consumerReducer');
var settingsForm = require('./settingsFormReducer');
var login = require('./loginReducer');
var routerReducer = require('react-router-redux').routerReducer;

var settings = require('./settingsReducer');

var combineReducers = require('redux').combineReducers;

var rootReducer = combineReducers({
  // UI states
  settingsForm:settingsForm,
  consumersPage: consumersPage,
  vehiclesPage: vehiclesPage,
  routing: routerReducer,
  vehicleRoutes: vehicleRoutes,
  login:login,

  // data states
  settings:settings


});
module.exports = rootReducer;
