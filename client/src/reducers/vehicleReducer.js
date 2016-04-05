var actionTypes = require('../constants/actionTypes/vehicleActionTypes');

function fetch(state, vehicles) {
  return vehicles;
}

function add(state, addedVehicle) {
  var vehicles = state.slice();
  vehicles.push(addedVehicle);
  return vehicles
}


function update(state, vehicle) {
  var vehicles = state.slice();
  //replaces the item with matching id
  for (var i = 0; i < vehicles.length; i++) {
    if (vehicles[i]._id == vehicle._id) {
       vehicles.splice(i, 1, vehicle);
       return vehicles;
    }
  }
  //could not find matching vehicle
  return state;
}


function destroy(state, id) {
  var vehicles = state.slice();
  //replaces the item with matching id
  for (var i = 0; i < vehicles.length; i++) {
    if (vehicles[i]._id == id) {
      vehicles.splice(i, 1);
      return vehicles;
    }
  }
  //could not find matching vehicle
  return state;
}



var vehiclesReducer = function(state, action) {
  state = state || [];
  switch (action.type) {
    case actionTypes.FETCH_VEHICLES_SUCCESS:
      return fetch(state, action.vehicles);
    case actionTypes.ADD_VEHICLE_SUCCESS:
      return add(state, action.addedVehicle);
    case actionTypes.UPDATE_VEHICLE_SUCCESS:
      return update(state, action.vehicle);
    case actionTypes.DESTROY_VEHICLE_SUCCESS:
      return destroy(state, action.id);
    default:
      return state;
  }
};

module.exports = vehiclesReducer;
