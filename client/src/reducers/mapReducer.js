var actionTypes = require('../constants/actionTypes/mapActionTypes.js');
const modelConst = require('../constants/models');
const mapConst = require('../constants/map');
var modelActionTypes = require('../constants/actionTypes/modelActionTypes');

var vehicleBoxClick = function(state, v_id) {

  var activeVId = state.activeVehicleId;
  if (activeVId === v_id) {
    // click on the active box : set none active

    $('#vp-' + v_id).collapse('toggle');

    return Object.assign({}, state, {
      error:null,
      activeVehicleId: undefined,
      directionsLoading: false,
      displayDirections: false
    })
  } else {
    // click on a non-active box : activate it

    $('#vp-' + v_id).collapse('toggle');
    $('#vp-' + activeVId).collapse('toggle');

    return Object.assign({}, state, {
      error:null,
      activeVehicleId: v_id,
      directionsLoading: false,
      displayDirections: false
    })
  }
}

var request = function(state, c_id) {
  return Object.assign({}, state, {
    error:null,
    markerLoading: c_id,
    vehicleLoading:true,
    directionsLoading: false,
    displayDirections: false,
    highlightedMarker: undefined
  });
}

var success = function(state) {
  return Object.assign({}, state, {
    markerLoading: undefined,
    vehicleLoading:false,
    serverSuccess: true
  });
}

var error = function(state, err) {
  return Object.assign({}, state, {
    error:err.responseJSON.msg,
    markerLoading: undefined,
    vehicleLoading:false,
    serverSuccess: false
  });
}

var highlightMarker = function(state, id) {
  return Object.assign({}, state, {
    error:null,
    highlightedMarker: id
  })
}

var highlightMarkerOff = function(state, id) {
  return Object.assign({}, state, {
    error:null,
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
var findClusterIndex = function(clusters, cluster){
  for(var i = 0; i < clusters.length; i ++){
    var c = clusters[i];
    if(c.center.lat()== cluster.center.lat() &&
       c.center.lng()== cluster.center.lng()){
      return i;
    }
  }
  return -1;
}
var clusterMouseover = function (state, cluster_){
  var cluster = {
    markers:cluster_.markers_.slice(),
    center:cluster_.getCenter()
  }
  var clusters = state.clusters.slice();
  var index = findClusterIndex(clusters, cluster);
  if(index !== -1){
    return state;
  }
  clusters.push(cluster);
  return Object.assign({}, state, {
    clusters:clusters
  })
}
var clusterInfoClose = function (state, cluster){
  var clusters = state.clusters.slice();
  var clusterIndex = findClusterIndex(clusters, cluster);
  clusters.splice(clusterIndex,  1);
  return Object.assign({}, state, {
    clusters:clusters
  })
}
var mapZoomChanged = function (state, cluster){
  return Object.assign({}, state, {
    clusters:[]
  })
}

var findConsumerMarkerIndex = function(consumerId, markers){
  for(var i=0; i <markers.length; i++){
    var marker = markers[i];
    if(marker.consumerId == consumerId){
      return i;
    }
  }
  return -1;
}

var openMarkerInfo = function (state, consumerId){
  var index = findConsumerMarkerIndex(consumerId, state.consumerMarkers);
  if(index == -1){
    return state;
  }
  var consumerMarkers = state.consumerMarkers.slice();
  var marker = Object.assign({}, consumerMarkers[index], {
    showInfo:true
  })
  consumerMarkers.splice(index, 1, marker);

  return Object.assign({}, state, {
    consumerMarkers:consumerMarkers
  })
}

var closeMarkerInfo = function (state, consumerId){
  var index = findConsumerMarkerIndex(consumerId, state.consumerMarkers);
  if(index == -1){
    return state;
  }
  var consumerMarkers = state.consumerMarkers.slice();
  var marker = Object.assign({}, consumerMarkers[index], {
    showInfo:false
  })
  consumerMarkers.splice(index, 1, marker);

  return Object.assign({}, state, {
    consumerMarkers:consumerMarkers
  })
}

  /**
   * TODO IMPORTANT handle errors
   */
var initState= {
  consumerMarkers:[],
  clusters:[]
}
var reducer = function(state, action) {
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
    case (actionTypes.MAP_CLUSTER_MOUSEOVER):
      return clusterMouseover(state, action.cluster_)
    case (actionTypes.MAP_CLUSTER_INFO_CLOSE):
      return clusterInfoClose(state, action.cluster)
    case (actionTypes.MAP_ZOOM_CHANGED):
      return mapZoomChanged(state)
    case (actionTypes.MAP_OPEN_MARKER_INFO):
      return openMarkerInfo(state, action.consumerId)
    case (actionTypes.MAP_CLOSE_MARKER_INFO):
      return closeMarkerInfo(state, action.consumerId)
    case (modelActionTypes.FETCH):
      if(action.model == modelConst.CONSUMERS && action.status == modelActionTypes.SUCCESS)
        return setConsumerMarkers(state, action.response)
    case (modelActionTypes.UPDATE):
      if (action.model == modelConst.SETTINGS && action.status == modelActionTypes.SUCCESS)
        return setOptionsIncMarker(state, action.response)
      if (action.model == modelConst.VEHICLES && action.status == modelActionTypes.LOADING)
        return request(state)
      if (action.model == modelConst.VEHICLES && action.status == modelActionTypes.ERROR)
        return error(state, action.error)
      if (action.model == modelConst.VEHICLES && action.status == modelActionTypes.SUCCESS)
        return success(state)
    case (modelActionTypes.DELETE):
      if (action.model == modelConst.VEHICLES && action.status == modelActionTypes.SUCCESS)
        return checkActiveVehicleIdForDelete(state, action.id)
    default:
      return state;
  }
};

module.exports = reducer;
