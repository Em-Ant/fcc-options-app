var Ajax = require('../../js/ajax-functions.js');
var actionTypes = require('../constants/actionTypes/vehicleRouteActionTypes.js');
var ModelActions = require('./modelActions');
var models = require('../constants/models.js');
var vehicleActions = new ModelActions(models.VEHICLES);
var wptActions = require('../constants/actionTypes/waypointsActionTypes');

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

module.exports.addWpt = function(v, newWpt) {
  return function(dispatch) {
    dispatch({
      type: wptActions.WPT_ADD_REQUEST
    });

    var wpts = v.additionalWpts.slice();
    wpts.push(newWpt);

    Ajax.post('/api/vehicle/' + v._id, {
        additionalWpts: wpts,
        insert: 'additionalWpt'
      },
      function(err, response) {
        if (err) {
          return dispatch({
            type: wptActions.WPT_ADD_FAILURE,
            error: err
          });
        }

        dispatch({
          type: wptActions.WPT_ADD_SUCCESS,
          v_id: v._id,
          vehicle: response
        })
    })
  }
}

module.exports.editWpts = function(v_id, newWpts) {
  return function(dispatch) {
    dispatch({
      type: wptActions.WPT_EDIT_REQUEST
    });


    Ajax.post('/api/vehicle/' + v_id, {
        additionalWpts: newWpts,
      },
      function(err, response) {
        if (err) {
          return dispatch({
            type: wptActions.WPT_EDIT_FAILURE,
            error: err
          });
        }

        dispatch({
          type: wptActions.WPT_EDIT_SUCCESS,
          v_id: v_id,
          vehicle: response
        })
    })
  }
}


module.exports.wptFormsChanged = function() {
  return {type: wptActions.WPT_FORMS_CHANGED}
}

module.exports.reorderConsumer = function(vehicle, vData) {

  var updatedVehicle = Object.assign({}, vehicle, {
    consumers: vData.consumers,
    additionalWpts: vData.additionalWpts
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
