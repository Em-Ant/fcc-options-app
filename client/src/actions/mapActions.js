var Ajax = require('../../js/ajax-functions.js');
var actionTypes = require('../constants/actionTypes/mapActionTypes.js');
//var directionsUtils = require('../utils/directionsUtils');

module.exports.vehicleBoxClick = function(v_id) {
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

module.exports.removeFromActiveBus = function(c_id, active_v) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.MAP_REMOVE_FROM_ACTIVE_BUS_REQUEST,
      id: c_id
    });

    var consumersOnActive = active_v.consumers.slice();
    var ind = consumersOnActive.indexOf(c_id);
    consumersOnActive.splice(ind, 1);

    Ajax.postWithArray('/api/vehicle/consumers/' + active_v._id,
      JSON.stringify({
        consumers: consumersOnActive,
        insert: false
      }),
      function(err, stat) {
        if (err) {
          return dispatch({
            type: actionTypes.MAP_REMOVE_FROM_ACTIVE_BUS_ERROR,
            error: err,
            msg: 'Error updating Vehicle'
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

module.exports.addToActiveBus = function(c_id, active_v) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.MAP_ADD_TO_ACTIVE_BUS_REQUEST,
      id: c_id
    });
    var consumersOnActive = active_v.consumers.slice();
    consumersOnActive.push(c_id);

    Ajax.postWithArray('/api/vehicle/consumers/' + active_v._id,
      JSON.stringify({
        consumers: consumersOnActive,
        insert: c_id
      }),
      function(err, stat) {
        if (err) {
          return dispatch({
            type: actionTypes.MAP_ADD_TO_ACTIVE_BUS_ERROR,
            error: err,
            msg: 'Error updating Vehicle'
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
