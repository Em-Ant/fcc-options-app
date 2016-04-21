var actionTypes = require('../constants/actionTypes/mapActionTypes.js');
const modelConst = require('../constants/models');
const mapConst = require('../constants/map');
var cActionTypes = require('../constants/actionTypes/consumerActionTypes');
var modelActionTypes = require('../constants/actionTypes/modelActionTypes');

var vehicleBoxClick = function(state, v_id) {

  var activeVId = state.activeVehicleId;
  if (activeVId === v_id) {
    // click on the active box : set none active

    $('#vp-' + v_id).collapse('toggle');

    return Object.assign({}, state, {
      activeVehicleId: undefined,
      directionsLoading: false,
      displayDirections: false
    })
  } else {
    // click on a non-active box : activate it

    $('#vp-' + v_id).collapse('toggle');
    $('#vp-' + activeVId).collapse('toggle');

    return Object.assign({}, state, {
      activeVehicleId: v_id,
      directionsLoading: false,
      displayDirections: false
    })
  }
}

var request = function(state, c_id) {
  return Object.assign({}, state, {
    markerLoading: c_id,
    directionsLoading: false,
    displayDirections: false
  });
}

var success = function(state) {
  return Object.assign({}, state, {
    markerLoading: undefined,
    serverSuccess: true
  });
}

var error = function(state, err) {
  console.log(err.responseJSON.msg);
  return Object.assign({}, state, {
    markerLoading: undefined,
    serverSuccess: false
  });
}

var highlightMarker = function(state, id) {
  return Object.assign({}, state, {
    highlightedMarker: id
  })
}

var highlightMarkerOff = function(state, id) {
  return Object.assign({}, state, {
    highlightedMarker: undefined
  })
}

var checkActiveVehicleIdForDelete = function(state, id) {
  // checks if the active Vehicle has been deleted,
  // if yes reset the tracker - Fix for #14

  if (state.activeVehicleId === id) {
    return Object.assign({}, state, {
      activeVehicleId: undefined
    })
  }
  return state;
}

var checkActiveVehicleIdForDelete = function(state, id) {
  // checks if the active Vehicle has been deleted,
  // if yes reset the tracker - Fix for #14

  if (state.activeVehicleId === id) {
    return Object.assign({}, state, {
      activeVehicleId: undefined
    })
  }
  return state;
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
var setOptionsIncMarker = function(state, settings) {
  var optionsIncMarker = {
    position: settings.optionsIncCoords,
    title: mapConst.OPTIONS_INC_NAME,
    icon: mapConst.OPTIONS_INC_MARKER_ICON
  }
  return Object.assign({}, state, {
    optionsIncMarker: optionsIncMarker
  });
}

var setConsumerMarkers = function(state, consumers) {
    var highlightedConsumerId = state.highlightedMarker;
    var consumerMarkers = consumers.map(function(consumer) {

      var icon = mapConst.UNASSIGNED_CONSUMER_ICON;
      if (highlightedConsumerId == consumer._id) {
        icon = mapConst.HIGHLIGHTED_CONSUMER_ICON;
      }
      //TODO not sure how to figure out which vehicle the consumer is assigned to
      //right now this this is calculated in the map component
      //  else if (consumersToVehiclesMap[c_id]) {
      //    // consumer is on board
      //    if(activeVehicleId !== consumersToVehiclesMap[c_id]){
      //      icon = mapConst.ASSIGNED_CONSUMER_ICON;// not on the active bus
      //    }else{
      //      icon = mapConst.SELECTED_ASSIGNED_CONSUMER_ICON;// on the active bus
      //    }
      //  }
      var marker = {
        position: consumer.position,
        title: consumer.name,
        icon: icon,
        consumerId: consumer._id
      }
      return marker;
    });

    return Object.assign({}, state, {
      consumerMarkers: consumerMarkers
    });
  }
  /**
   * TODO IMPORTANT handle errors
   */
var initState= {
  consumerMarkers:[]
}
var reducer = function(state, action) {
  console.log(action);
  state = state || initState;
  switch (action.type) {
    case (actionTypes.MAP_VEHICLE_BOX_CLICK):
      return vehicleBoxClick(state, action.id);
    case (actionTypes.MAP_REMOVE_FROM_ACTIVE_BUS_REQUEST):
      return request(state, action.id);
    case (actionTypes.MAP_REMOVE_FROM_ACTIVE_BUS_SUCCESS):
    case (actionTypes.MAP_REMOVE_FROM_ACTIVE_BUS_ERROR):
      return success(state);
    case (actionTypes.MAP_ADD_TO_ACTIVE_BUS_REQUEST):
      return request(state, action.id);
    case (actionTypes.MAP_ADD_TO_ACTIVE_BUS_SUCCESS):
      return success(state);
    case (actionTypes.MAP_ADD_TO_ACTIVE_BUS_ERROR):
      return error(state, action.error);
    case (actionTypes.MAP_HIGHLIGHT_MARKER):
      return highlightMarker(state, action.id);
    case (actionTypes.MAP_HIGHLIGHT_MARKER_OFF):
      return highlightMarkerOff(state, action.id);
    case (actionTypes.DIRECTIONS_LOAD_REQUEST):
      return loadDirectionsRequest(state)
    case (actionTypes.DIRECTIONS_LOAD_FAILURE):
      return loadDirectionsFailure(state, action.error)
    case (actionTypes.DIRECTIONS_LOAD_SUCCESS):
      return loadDirectionsSuccess(state)
    case (actionTypes.DIRECTIONS_HIDE):
      return hideDirections(state)

    case (cActionTypes.CONSUMER_INDEX_SUCCESS):
      return setConsumerMarkers(state, action.consumers)
    case (modelActionTypes.FETCH):
    case (modelActionTypes.UPDATE):
      if (action.model == modelConst.SETTINGS && action.status == modelActionTypes.SUCCESS)
        return setOptionsIncMarker(state, action.response)
    case (modelActionTypes.DELETE):
      if (action.model == modelConst.VEHICLES && action.status == modelActionTypes.SUCCESS)
        return checkActiveVehicleIdForDelete(state, action.id)
    default:
      return state;
  }
};

module.exports = reducer;
