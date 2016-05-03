var actionTypes = require('../constants/actionTypes/vehicleRouteActionTypes.js');
const modelConst = require('../constants/models');
const mapConst = require('../constants/map');

var request = function(state, c_id) {
  return Object.assign({}, state, {
    error: null,
    markerLoading: c_id,
    vehicleLoading: true,
    directionsLoading: false,
    displayDirections: false,
    highlightedMarker: undefined
  });
}

var success = function(state) {
  return Object.assign({}, state, {
    markerLoading: undefined,
    vehicleLoading: false,
    serverSuccess: true
  });
}

var error = function(state, err) {
  return Object.assign({}, state, {
    error: err.responseJSON.msg,
    markerLoading: undefined,
    vehicleLoading: false,
    serverSuccess: false
  });
}

var loadDirectionsRequest = function(state, directions) {
  return Object.assign({}, state, {
    directionsLoading: true,
    displayDirections: false
  })
}
var loadDirectionsFailure = function(state, error) {
  return Object.assign({}, state, {
    directionsLoading: false,
    displayDirections: false
  })
}
var loadDirectionsSuccess = function(state, directions) {
  return Object.assign({}, state, {
    directionsLoading: false,
    displayDirections: true
  })
}
var hideDirections = function(state) {
  return Object.assign({}, state, {
    directionsLoading: false,
    displayDirections: false
  })
}
var initState = {}
var reducer = function(state, action) {
  state = state || initState;
  switch (action.type) {
    case (actionTypes.DIRECTIONS_LOAD_REQUEST):
      return loadDirectionsRequest(state)
    case (actionTypes.DIRECTIONS_LOAD_FAILURE):
      return loadDirectionsFailure(state, action.error)
    case (actionTypes.DIRECTIONS_LOAD_SUCCESS):
      return loadDirectionsSuccess(state)
    case (actionTypes.DIRECTIONS_HIDE):
      return hideDirections(state)
    case (actionTypes.OPTIMIZE_ROUTE_REQUEST):
      return request(state);
    case (actionTypes.OPTIMIZE_ROUTE_ERROR):
      return error(state, action.error)
    case (actionTypes.OPTIMIZE_ROUTE_SUCCESS):
      return success(state)
    default:
      return state;
  }
};

module.exports = reducer;
