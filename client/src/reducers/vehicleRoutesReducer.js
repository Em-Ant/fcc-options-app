/*
Sets the vehicleRoutes state
*/
function loadVehicleRoutes(state, vehicleRoutes) {
  return vehicleRoutes;
}

var initState = [];
var vehicleRoutesReducer = function(state, action) {
  state = state || initState;
  switch (action.type){
    case 'RECEIVE_VEHICLE_ROUTES':
      return loadVehicleRoutes(state, action.vehicleRoutes);
    default:
      return state;
  }
};

module.exports = vehicleRoutesReducer;
