var Ajax = require('../../js/ajax-functions.js');
var actionTypes = require('../constants/actionTypes/vehicleRouteActionTypes.js');
var ModelActions = require('./modelActions');
var models = require('../constants/models.js');
var vehicleActions = new ModelActions(models.VEHICLES);

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

module.exports.hideDirections = function() {
  return {
    type: actionTypes.DIRECTIONS_HIDE
  }
};

module.exports.reorderConsumer = function(vehicle, startConsumerPosition, endConsumerPosition) {
  var consumers = vehicle.consumers.slice();
  //remove at start position, and place in end position
  var removedConsumers = consumers.splice(startConsumerPosition, 1);
  consumers.splice(endConsumerPosition, 0, removedConsumers[0]);

  var updatedVehicle = Object.assign({}, vehicle, {
    consumers: consumers
  })
  return vehicleActions.update(updatedVehicle);
}

module.exports.optimizeRoute = function(v_id, mode) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.OPTIMIZE_ROUTE_REQUEST
    });
    Ajax.get('/api/vehicle/optimize-route/' + v_id + '?origin=' + mode,
     function(err, response) {
      if (err) {
        return dispatch({
          type: actionTypes.OPTIMIZE_ROUTE_FAILURE,
          error: err
        });
      }
      dispatch({

        type: actionTypes.OPTIMIZE_ROUTE_SUCCESS,
        vehicle: response
      })
    })
  }
}

module.exports.saveRouteStartTime = function(vehicleId, routeStartTime) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.SAVE_ROUTE_TIME_REQUEST
    });
    Ajax.put('/api/directions/' + vehicleId, routeStartTime,
     function(err, response) {
      if (err) {
        return dispatch({
          type: actionTypes.SAVE_ROUTE_TIME_FAILURE,
          error: err
        });
      }
      dispatch({
        type: actionTypes.SAVE_ROUTE_TIME_SUCCESS,
        response: response
      })
    })
  }
}
