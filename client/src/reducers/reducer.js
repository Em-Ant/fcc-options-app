var vehicleRoutes =require('./vehicleRoutesReducer');
var vehiclesPage =require('./vehicleReducer');
var consumersForm = require('./consumerFormReducer');
var settingsForm = require('./settingsFormReducer');
var login = require('./loginReducer');
var routerReducer = require('react-router-redux').routerReducer;

var settings = require('./settingsReducer');
var consumers = require('./consumerReducer');

var combineReducers = require('redux').combineReducers;

var rootReducer = combineReducers({
  // UI state
  settingsForm:settingsForm,
  consumersForm: consumersForm,
  vehiclesPage: vehiclesPage,
  routing: routerReducer,
  vehicleRoutes: vehicleRoutes,
  login:login,

  // data state
  settings:settings,
  consumers: consumers

});
module.exports = rootReducer;
