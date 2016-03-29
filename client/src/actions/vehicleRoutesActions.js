var Ajax = require('../../js/ajax-functions.js');
var VEHICLE_ROUTES_REQUEST = "VEHICLE_ROUTES_REQUEST";
var VEHICLE_ROUTES_FAILURE = "VEHICLE_ROUTES_FAILURE";
var VEHICLE_ROUTES_SUCCESS = "VEHICLE_ROUTES_SUCCESS";
var REQUEST_VEHICLE_ROUTES = "REQUEST_VEHICLE_ROUTES";
var REQUEST_VEHICLE_ROUTES = "REQUEST_VEHICLE_ROUTES";

/*
Retrieves the vehicle routes
*/
module.exports.fetch = function() {
  // this will return a thunk
  return function(dispatch) {
    // dispatch an action stating that we are requesting routes
    dispatch({
      type: 'FETCH_VEHICLE_ROUTES_REQUEST',
    });
    // call the external api endpoint to retrieve routes
    Ajax.get('/api/route/', function(err, vehicleRoutes) {
      // an error occurred retrieving vehicle routes
      if (err) {
        dispatch({
          type: 'FETCH_VEHICLE_ROUTES_FAILURE',
          message: err.responseJSON.msg
        });
      } else {
        // request was successful
        // dispatch an action with the received vehicle routes
        dispatch({
          type: 'FETCH_VEHICLE_ROUTES_SUCCESS',
          vehicleRoutes: vehicleRoutes
        });
      }

    });
  }
}

/*
Adds the vehicle route
*/
module.exports.create = function(vehicleRoute) {
  // this will return a thunk
  return function(dispatch) {
    // dispatch an action stating that we are requesting routes
    dispatch({
      type: 'ADD_VEHICLE_ROUTE_REQUEST'
    });
    // call the external api endpoint to retrieve routes
    Ajax.post('/api/route/', vehicleRoute, function(err) {
      // an error occurred retrieving vehicle routes
      if (err) {
        dispatch({
          type: 'ADD_VEHICLE_ROUTE_FAILURE',
          message: err.responseJSON.msg
        });
      } else {
        // request was successful
        // not sure if this is supposed to be called to display the newly added route
        dispatch({
          type: 'ADD_VEHICLE_ROUTE_SUCCESS',
          addedVehicleRoute: vehicleRoute
        });
      }
    });
  }
}

module.exports.destroy = function(id) {
  // this will return a thunk
  return function(dispatch) {
    // dispatch an action stating that we are requesting routes
    dispatch({
      type: 'DESTROY_VEHICLE_ROUTE_REQUEST',
      id:id
    });
    // call the external api endpoint to retrieve routes
    Ajax.delete('/api/route/'+id, {}, function(err) {
      // an error occurred retrieving vehicle routes
      if (err) {
        dispatch({
          type: 'DESTROY_VEHICLE_ROUTE_FAILURE',
          id:id,
          message: err.responseJSON.msg
        });
      } else {
        // request was successful
        // not sure if this is supposed to be called to display the newly added route
        dispatch({
          type: 'DESTROY_VEHICLE_ROUTE_SUCCESS',
          id:id
        });
      }
    });
  }
}
