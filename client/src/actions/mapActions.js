var Ajax = require('../../js/ajax-functions.js');
var actionTypes = require('../constants/actionTypes/mapActionTypes.js');
var vehicleUtils = require('../utils/vehicleUtils');
var ModelActions = require('./modelActions');
var models = require('../constants/models.js');
var modelActionTypes = require('../constants/actionTypes/modelActionTypes.js');
var vehicleActions = new ModelActions(models.VEHICLES);
var vehicleBoxClick = module.exports.vehicleBoxClick= function(v_id) {
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

var removeFromActiveBus  = module.exports.removeFromActiveBus= function(c_id, active_v) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.MAP_REMOVE_FROM_ACTIVE_BUS_REQUEST,
      id: c_id
    });

    var consumersOnActive = active_v.consumers.slice();
    var ind = consumersOnActive.indexOf(c_id);
    consumersOnActive.splice(ind, 1);

    Ajax.post('/api/vehicle/' + active_v._id,
      {
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

    Ajax.post('/api/vehicle/' + active_v._id,
      {
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

module.exports.displayDirections = function(v_id) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.DIRECTIONS_LOAD_REQUEST
    });
    Ajax.get('/api/directions/' + v_id, function(err, response) {
      if (err) {
        return dispatch({
          type: actionTypes.DIRECTIONS_LOAD_FAILURE,
          error: err
        });
      }
      dispatch({
        type: actionTypes.DIRECTIONS_LOAD_SUCCESS,
        response: response
      })
    })
  }
 };

module.exports.hideDirections = function(vehicle, consumers, settings) {
  return {
    type: actionTypes.DIRECTIONS_HIDE
  }
};

module.exports.markerClick = function(c_id, markerLoading, consumersToVehiclesMap, activeVehicleId, vehicles, consumers){
  if(!markerLoading) {
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
        if(vehicleUtils.willConsumerFit(
          c_id, vehicles[activeVehicleId], consumers)){
            return addToActiveBus(
              c_id,
              vehicles[activeVehicleId]
            );
          }
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

module.exports.reorderConsumer = function(vehicle, startConsumerPosition, endConsumerPosition){
    var consumers = vehicle.consumers.slice();

    console.log("before",vehicle)
    var removedConsumers = consumers.splice(startConsumerPosition, 1);
    consumers.splice(endConsumerPosition, 0, removedConsumers[0] );
    var updatedVehicle = Object.assign({}, vehicle, {
      consumers:consumers
    })
    console.log("after",updatedVehicle)
    return vehicleActions.update(updatedVehicle);
}
