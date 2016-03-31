var vehicleRoutes =require('./vehicleRoutesReducer');
var vehiclesPage =require('./vehicleReducer');
var consumersPage = require('./consumerReducer');
var login = require('./loginReducer');

var routerReducer = require('react-router-redux').routerReducer;

var combineReducers = require('redux').combineReducers;

var rootReducer = combineReducers({
  consumersPage: consumersPage,
  vehiclesPage: vehiclesPage,
  routing: routerReducer,
  vehicleRoutes: vehicleRoutes,
  login:login
});
module.exports = rootReducer;
