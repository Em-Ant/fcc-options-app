
var Ajax = require('../../js/ajax-functions.js');

/*
Retrieves the vehicle routes
*/
var fetchVehicleRoutes = function() {
  // this will return a thunk
  return function(dispatch) {
    // dispatch an action stating that we are requesting routes
    dispatch({
      type: 'REQUEST_VEHICLE_ROUTES'
    });
    // call the external api endpoint to retrieve routes
    Ajax.get('/api/route/', function(err, vehicleRoutes) {
      // an error occurred retrieving vehicle routes
      if (err) {
        dispatch({
          type: 'REQUEST_VEHICLE_ROUTES',
          message: err.responseJSON.msg
        });
      } else {
        // request was successful
        // dispatch an action with the received vehicle routes
        dispatch({
          type: 'RECEIVE_VEHICLE_ROUTES',
          vehicleRoutes: vehicleRoutes
        });
      }

    });
  }
}

/*
Adds the vehicle route
*/
var addVehicleRoute = function(vehicleRoute) {
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

module.exports.addVehicleRoute = addVehicleRoute;
module.exports.fetchVehicleRoutes = fetchVehicleRoutes;
