var Ajax = require('../../js/ajax-functions.js');
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
    dispatch({
      type: 'ADD_VEHICLE_ROUTE_REQUEST'
    });
    Ajax.post('/api/route/', vehicleRoute, function(err, addedVehicleRoute) {
      if (err) {
        dispatch({
          type: 'ADD_VEHICLE_ROUTE_FAILURE',
          message: err.responseJSON.msg
        });
      } else {
        dispatch({
          type: 'ADD_VEHICLE_ROUTE_SUCCESS',
          addedVehicleRoute: addedVehicleRoute
        });
      }
    });
  }
}


/*
Update the vehicle route
*/
module.exports.update = function(vehicleRoute) {
  // this will return a thunk
  return function(dispatch) {
    dispatch({
      type: 'UPDATE_VEHICLE_ROUTE_REQUEST'
    });
    Ajax.post('/api/route/' + vehicleRoute._id, vehicleRoute, function(err) {
      if (err) {
        dispatch({
          type: 'UPDATE_VEHICLE_ROUTE_FAILURE',
          message: err.responseJSON.msg
        });
      } else {
        dispatch({
          type: 'UPDATE_VEHICLE_ROUTE_SUCCESS',
          vehicleRoute: vehicleRoute
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


module.exports.setEditMode = function(id) {
  return{
    type:'SET_EDIT_MODE',
    id:id
  }
}

module.exports.setAddMode = function() {
  return{
    type:'SET_ADD_MODE'
  }
}
