/*
Sets the vehicleRoutes state
*/
function loadVehicleRoutes(state, vehicleRoutes) {
  var state = Object.assign({}, state, {items:vehicleRoutes});
  return state;
}

function addVehicleRoute(state, addedVehicleRoute){
  var newItemsState = state.items.slice();
  newItemsState.push(addedVehicleRoute);
  var newState = Object.assign({}, state, {items:newItemsState})
  return newState;
}

var initState = {
  items:[]
};
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
