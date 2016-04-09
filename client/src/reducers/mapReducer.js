var actionTypes = require('../constants/actionTypes/mapActionTypes.js');

var vehicleBoxClick = function (state, v_id) {



  var activeVId = state.activeVehicleId;
  if ( activeVId === v_id) {
    // click on the active box : set none active

    $('#vp-'+v_id).collapse('toggle');

    return Object.assign({}, state, {activeVehicleId: undefined})
  } else {
    // click on a non-active box : activate it

    $('#vp-'+v_id).collapse('toggle');
    $('#vp-'+activeVId).collapse('toggle');

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

var highlightMarker = function (state, id) {
  return Object.assign({}, state, {highlightedMarker: id})
}

var highlightMarkerOff = function (state, id) {
  return Object.assign({}, state, {highlightedMarker: undefined})
}
var initState = {};

/**
* TODO IMPORTANT handle errors
*/

var reducer = function(state, action) {
  state = state || initState;
  switch (action.type){
    case (actionTypes.MAP_VEHICLE_BOX_CLICK) :
      return vehicleBoxClick(state, action.id);
    case (actionTypes.MAP_REMOVE_FROM_ACTIVE_BUS_REQUEST) :
      return request(state, action.id);
    case (actionTypes.MAP_REMOVE_FROM_ACTIVE_BUS_SUCCESS) :
      return success(state);
    case (actionTypes.MAP_ADD_TO_ACTIVE_BUS_REQUEST) :
      return request(state, action.id);
    case (actionTypes.MAP_ADD_TO_ACTIVE_BUS_SUCCESS) :
      return success(state);
    case (actionTypes.MAP_HIGHLIGHT_MARKER) :
      return highlightMarker(state, action.id);
    case (actionTypes.MAP_HIGHLIGHT_MARKER_OFF) :
      return highlightMarkerOff(state, action.id);
    default:
      return state;
  }
};

module.exports = reducer;
