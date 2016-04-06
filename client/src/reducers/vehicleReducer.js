var actionTypes = require('../constants/actionTypes/vehicleActionTypes');
var commonCRUD = require('../commons/commonReducerFunctions');


var vehiclesReducer = function(state, action) {
  state = state || {ids:[], data:{}};
  switch (action.type) {
    case actionTypes.FETCH_VEHICLES_SUCCESS:
      return commonCRUD.load(state, action.vehicles);
    case actionTypes.ADD_VEHICLE_SUCCESS:
      return commonCRUD.add(state, action.addedVehicle);
    case actionTypes.UPDATE_VEHICLE_SUCCESS:
      return commonCRUD.update(state, action.vehicle);
    case actionTypes.DESTROY_VEHICLE_SUCCESS:
      return commonCRUD.destroy(state, action.id);
    default:
      return state;
  }
};

module.exports = vehiclesReducer;
