var actionTypes = require('../constants/actionTypes/mapActionTypes.js');

var setActiveVehicleBox = function (state, v_id) {
  var activeVId = state.activeVehicleId;
  if ( activeVId === v_id) {
    // click on the active box : set none active
    return Object.assign({}, state, {activeVehicleId: undefined})
  } else {
    // click on a non-active box : activate it
    return Object.assign({}, state, {activeVehicleId: v_id})
  }
}

var request = function(state, c_id) {
  return Object.assign({}, state, {
    markerLoading : c_id
  });
}

var success = function(state) {
  return Object.assign({}, state, {
    markerLoading : undefined
  });
}

var initState = {};

var reducer = function(state, action) {
  state = state || initState;
  switch (action.type){
    case (actionTypes.MAP_VEHICLE_BOX_CLICK) :
      return setActiveVehicleBox(state, action.id);
    case (actionTypes.MAP_REMOVE_FROM_ACTIVE_BUS_REQUEST) :
      return request(state, action.id);
    case (actionTypes.MAP_REMOVE_FROM_ACTIVE_BUS_SUCCESS) :
      return success(state);
    case (actionTypes.MAP_ADD_TO_ACTIVE_BUS_REQUEST) :
      return request(state, action.id);
    case (actionTypes.MAP_ADD_TO_ACTIVE_BUS_SUCCESS) :
      return success(state);
    default:
      return state;
  }
};

module.exports = reducer;
