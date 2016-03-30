var vehicleRoutes =require('./vehicleRoutesReducer');
var consumersPage = require('./consumerReducer');
var login = require('./loginReducer');

var routerReducer = require('react-router-redux').routerReducer;

var combineReducers = require('redux').combineReducers;

var rootReducer = combineReducers({
  consumersPage: consumersPage,
  routing: routerReducer,
  vehicleRoutes: vehicleRoutes,
  login:login
});
module.exports = rootReducer;
