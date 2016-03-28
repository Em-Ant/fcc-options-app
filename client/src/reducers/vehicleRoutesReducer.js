/*
Sets the vehicleRoutes state
*/
function loadVehicleRoutes(state, vehicleRoutes) {
  return vehicleRoutes;
}

function addVehicleRoute(state, addedVehicleRoute){
  //TODO maybe use immutable.js?
  var newState = state.slice();
  console.log("vehicle route to add",addedVehicleRoute);
  newState.push(addedVehicleRoute);
  console.log("new added vehicle state", newState);
  return newState;
}

var initState = [];
var vehicleRoutesReducer = function(state, action) {
  state = state || initState;
  switch (action.type){
    case 'RECEIVE_VEHICLE_ROUTES':
      return loadVehicleRoutes(state, action.vehicleRoutes);
    case 'ADD_VEHICLE_ROUTE_SUCCESS':
      return addVehicleRoute(state, action.addedVehicleRoute);
    default:
      return state;
  }
};

module.exports = vehicleRoutesReducer;
