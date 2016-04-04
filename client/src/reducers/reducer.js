var vehicleRoutes =require('./vehicleRoutesReducer');
var vehiclesPage =require('./vehicleReducer');
var consumersPage = require('./consumerReducer');
var settingsForm = require('./settingsFormReducer');
var login = require('./loginReducer');
var routerReducer = require('react-router-redux').routerReducer;

var settings = require('./settingsReducer');

var combineReducers = require('redux').combineReducers;

var rootReducer = combineReducers({
  // UI state
  settingsForm:settingsForm,
  consumersPage: consumersPage,
  vehiclesPage: vehiclesPage,
  routing: routerReducer,
  vehicleRoutes: vehicleRoutes,
  login:login,

  // data state
  settings:settings


});
module.exports = rootReducer;
