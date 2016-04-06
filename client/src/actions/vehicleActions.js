var Ajax = require('../../js/ajax-functions.js');
var actionTypes = require('../constants/actionTypes/vehicleActionTypes');


/*
Retrieves the vehicles
*/
module.exports.fetch = function() {


  // this will return a thunk
  return function(dispatch) {
    dispatch({
      type: actionTypes.FETCH_VEHICLES_REQUEST,
    });
    // call the external api endpoint to retrieve routes
    Ajax.get('/api/vehicle/', function(err, vehicles) {
      if (err) {
        dispatch({
          type: actionTypes.FETCH_VEHICLES_FAILURE,
          message: err.responseJSON.msg
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_VEHICLES_SUCCESS,
          vehicles: vehicles
        });

              //TODO remove.  This is just for demo
          var normalize = require('normalizr').normalize;
          var Schema = require('normalizr').Schema;
          var arrayOf = require('normalizr').arrayOf;
          const vehicle = new Schema('vehicles',{ idAttribute: '_id' });
          console.log("before normalizing vehicles", vehicles);
          vehicles = normalize(vehicles, arrayOf(vehicle));
          console.log("after normalizing vehicles", vehicles);
      }

    });
  }
}

/*
Adds the vehicle
*/
module.exports.create = function(vehicle) {
  // this will return a thunk
  return function(dispatch) {
    dispatch({
      type: actionTypes.ADD_VEHICLE_REQUEST
    });
    Ajax.post('/api/vehicle/', vehicle, function(err, addedVehicle) {
      if (err) {
        dispatch({
          type: actionTypes.ADD_VEHICLE_FAILURE,
          message: err.responseJSON.msg
        });
      } else {
        dispatch({
          type: actionTypes.ADD_VEHICLE_SUCCESS,
          addedVehicle: addedVehicle
        });
      }
    });
  }
}


/*
Update the vehicle
*/
module.exports.update = function(vehicle) {
  // this will return a thunk
  return function(dispatch) {
    dispatch({
      type: actionTypes.UPDATE_VEHICLE_REQUEST
    });
    Ajax.post('/api/vehicle/' + vehicle._id, vehicle, function(err, updatedVehicle) {
      if (err) {
        dispatch({
          type: actionTypes.UPDATE_VEHICLE_FAILURE,
          message: err.responseJSON.msg
        });
      } else {
        dispatch({
          type: actionTypes.UPDATE_VEHICLE_SUCCESS,
          vehicle: updatedVehicle
        });
      }
    });
  }
}

module.exports.destroy = function(id) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.DESTROY_VEHICLE_REQUEST
    });
    Ajax.delete('/api/vehicle/'+id, {}, function(err) {
      if (err) {
        dispatch({
          type: actionTypes.DESTROY_VEHICLE_FAILURE,
          message: err.responseJSON.msg
        });
      } else {
        dispatch({
          type: actionTypes.DESTROY_VEHICLE_SUCCESS,
          id:id
        });
      }
    });
  }
}


module.exports.setEditMode = function(id) {
  return{
    type:actionTypes.SET_VEHICLE_EDIT_MODE,
    id:id
  }
}

module.exports.setAddMode = function() {
  return{
    type:actionTypes.SET_VEHICLE_ADD_MODE
  }
}
module.exports.closeForm = function() {
  return{
    type:actionTypes.CLOSE_VEHICLE_FORM
  }
}
