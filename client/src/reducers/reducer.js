var vehicleRoutes =require('./vehicleRoutesReducer');
var vehicles =require('./vehicleReducer');
var vehiclesPage =require('./vehiclePageReducer');
var consumersForm = require('./consumerFormReducer');
var settingsForm = require('./settingsFormReducer');
var login = require('./loginReducer');
var routerReducer = require('react-router-redux').routerReducer;
var mapPage = require('./mapReducer')

var settings = require('./settingsReducer');
var consumers = require('./consumerReducer');

var combineReducers = require('redux').combineReducers;

var rootReducer = combineReducers({
  // UI states
  settingsForm:settingsForm,
  consumersForm: consumersForm,
  vehiclesPage: vehiclesPage,
  routing: routerReducer,
  vehicleRoutes: vehicleRoutes,
  mapPage: mapPage,
  login: login,

  // data state
  settings:settings,
  consumers: consumers,
  vehicles: vehicles

});
module.exports = rootReducer;
