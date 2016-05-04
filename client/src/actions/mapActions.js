var Ajax = require('../../js/ajax-functions.js');
var actionTypes = require('../constants/actionTypes/mapActionTypes.js');
var ModelActions = require('./modelActions');
var models = require('../constants/models.js');
var vehicleActions = new ModelActions(models.VEHICLES);
var vehicleBoxClick = module.exports.vehicleBoxClick = function(v_id) {
  return {
    type: actionTypes.MAP_VEHICLE_BOX_CLICK,
    id: v_id
  }
}

module.exports.highlightMarker = function(c_id) {
  return {
    type: actionTypes.MAP_HIGHLIGHT_MARKER,
    id: c_id
  }
};

module.exports.highlightMarkerOff = function(c_id) {
  return {
    type: actionTypes.MAP_HIGHLIGHT_MARKER_OFF,
    id: c_id
  }
};

var removeFromActiveBus = module.exports.removeFromActiveBus = function(c_id, active_v) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.MAP_REMOVE_FROM_ACTIVE_BUS_REQUEST,
      id: c_id
    });

    var consumersOnActive = active_v.consumers.slice();
    var ind = consumersOnActive.indexOf(c_id);
    consumersOnActive.splice(ind, 1);

    Ajax.post('/api/vehicle/' + active_v._id, {
        consumers: consumersOnActive,
        insert: false
      },
      function(err, stat) {
        if (err) {
          return dispatch({
            type: actionTypes.MAP_REMOVE_FROM_ACTIVE_BUS_ERROR,
            error: err
          });
        }

        dispatch({
          type: actionTypes.MAP_REMOVE_FROM_ACTIVE_BUS_SUCCESS,
          v_id: active_v._id,
          consumersArray: consumersOnActive
        })
      })

  }
}

var addToActiveBus = module.exports.addToActiveBus = function(c_id, active_v) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.MAP_ADD_TO_ACTIVE_BUS_REQUEST,
      id: c_id
    });
    var consumersOnActive = active_v.consumers.slice();
    consumersOnActive.push(c_id);

    Ajax.post('/api/vehicle/' + active_v._id, {
        consumers: consumersOnActive,
        insert: c_id
      },
      function(err, stat) {
        if (err) {
          return dispatch({
            type: actionTypes.MAP_ADD_TO_ACTIVE_BUS_ERROR,
            error: err
          });
        }

        dispatch({
          type: actionTypes.MAP_ADD_TO_ACTIVE_BUS_SUCCESS,
          v_id: active_v._id,
          consumersArray: consumersOnActive
        })
      })

  }
}

module.exports.markerClick = function(c_id, markerLoading, consumersToVehiclesMap, activeVehicleId, vehicles, consumers) {
  if (!markerLoading) {
    // not in loading state
    if (consumersToVehiclesMap[c_id]) {
      // marked consumer is on a vehicle

      if (consumersToVehiclesMap[c_id] == activeVehicleId) {
        // marked consumer is on the active vehicle
        return removeFromActiveBus(
          c_id,
          vehicles[activeVehicleId]
        );
      } else {
        // marked consumer is not on the active vehicle
        // activate the vehicle which the consumers is on
        return vehicleBoxClick(consumersToVehiclesMap[c_id]);
      };
    } else {
      // marked consumer is not on a vehicle
      if (activeVehicleId) {
        // A vehicle is active (A Collapsible Box is open)
        return addToActiveBus(
          c_id,
          vehicles[activeVehicleId]
        );

      }
    }
  }
  return {
    type: actionTypes.MARKER_CLICK_ERROR,
    error: {
      msg: "markers frozen in loading state"
    }
  }
}

module.exports.clusterMouseover = function(cluster_) {
  return {
    type: actionTypes.MAP_CLUSTER_MOUSEOVER,
    cluster_: cluster_
  }
}

module.exports.clusterInfoClose = function(cluster) {
  return {
    type: actionTypes.MAP_CLUSTER_INFO_CLOSE,
    cluster: cluster
  }
}
module.exports.mapZoomChanged = function() {
  return {
    type: actionTypes.MAP_ZOOM_CHANGED
  }
}

module.exports.clickConsumer = function(c_id) {
  return {
    type: actionTypes.MAP_CENTER_CONSUMER_MARKER,
    consumerId: c_id
  }
}

module.exports.markerInfoOpen = function(marker) {
  return {
    type: actionTypes.MAP_OPEN_MARKER_INFO,
    consumerId: marker.consumerId
  }
}

module.exports.markerInfoClose = function(marker) {
  return {
    type: actionTypes.MAP_CLOSE_MARKER_INFO,
    consumerId: marker.consumerId
  }
}

module.exports.saveClusters = function(clusters_) {
  return {
    type: actionTypes.MAP_SAVE_CLUSTERS,
    clusters_: clusters_
  }
}
module.exports.setActiveVehicleId = function(vehicleId) {
  return {
    type: actionTypes.MAP_SET_ACTIVE_VEHICLE_ID,
    vehicleId: vehicleId
  }
}
