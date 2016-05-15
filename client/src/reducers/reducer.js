var vehicles =require('./vehicleReducer');
var vehiclesPage =require('./vehiclePageReducer');
var consumersForm = require('./consumerFormReducer');
var settingsForm = require('./settingsFormReducer');
var loginForm = require('./loginFormReducer');
var auth = require('./authReducer');
var routerReducer = require('react-router-redux').routerReducer;
var mapPage = require('./mapReducer')
var vehicleRoutePage = require('./vehicleRouteReducer')
var usersPage = require('./usersPageReducer');
var mapFilters = require('./mapFiltersReducer');

var settings = require('./settingsReducer');
var consumers = require('./consumerReducer');
var directions = require('./directionsReducer');
var users = require('./usersReducer');

var combineReducers = require('redux').combineReducers;

var rootReducer = combineReducers({
  // UI states
  settingsForm:settingsForm,
  consumersForm: consumersForm,
  vehiclesPage: vehiclesPage,
  routing: routerReducer,
  mapPage: mapPage,
  vehicleRoutePage: vehicleRoutePage,
  loginForm: loginForm,
  usersPage: usersPage,
  mapFilters:mapFilters,

  // data state
  auth:auth,
  settings:settings,
  consumers: consumers,
  vehicles: vehicles,
  directions:directions,
  users: users,

});
module.exports = rootReducer;
