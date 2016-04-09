
var Ajax = require('../../js/ajax-functions.js');
var actionTypes = require('../constants/actionTypes/mapActionTypes.js');

module.exports.vehicleBoxClick = function (v_id) {
  return {
    type: actionTypes.MAP_VEHICLE_BOX_CLICK,
    id: v_id
  }
}

module.exports.removeFromActiveBus = function (c_id, active_v_id) {
  return function (dispatch) {
    dispatch({
      type: actionTypes.MAP_REMOVE_FROM_ACTIVE_BUS_REQUEST,
      id : c_id
    });

    Ajax.post('/api/vehicle/' + active_v_id + '/pull/' + c_id, {}, function(err, stat){
      if(err) {
        return dispatch({
          type: actionTypes.MAP_REMOVE_FROM_ACTIVE_BUS_ERROR,
          msg: 'Error updating Vehicle'
        });
      }

      dispatch({
        type: actionTypes.MAP_REMOVE_FROM_ACTIVE_BUS_SUCCESS,
        v_id: active_v_id,
        c_id: c_id
      })
    })

  }
}

module.exports.addToActiveBus = function (c_id, active_v_id) {
  return function (dispatch) {
    dispatch({
      type: actionTypes.MAP_ADD_TO_ACTIVE_BUS_REQUEST,
      id : c_id
    });

    Ajax.post('/api/vehicle/' + active_v_id + '/push/' + c_id, {}, function(err, stat){
      if(err) {
        return dispatch({
          type: actionTypes.MAP_ADD_TO_ACTIVE_BUS_ERROR,
          msg: 'Error updating Vehicle'
        });
      }

      dispatch({
        type: actionTypes.MAP_ADD_TO_ACTIVE_BUS_SUCCESS,
        v_id: active_v_id,
        c_id: c_id
      })
    })

  }
}
