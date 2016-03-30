var vehicleRoutes =require('./vehicleRoutesReducer.js');

var consumersPage = require('./consumerReducer')

var routerReducer = require('react-router-redux').routerReducer;

var combineReducers = require('redux').combineReducers;

var rootReducer = combineReducers({
  consumersPage: consumersPage,
  routing: routerReducer,
  vehicleRoutes: vehicleRoutes

});
module.exports = rootReducer;
