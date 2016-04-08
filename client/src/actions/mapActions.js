
var Ajax = require('../../js/ajax-functions.js');
var actionTypes = require('../constants/actionTypes/mapActionTypes.js');

module.exports.vehicleBoxClick = function (v_id) {
  return {
    type: actionTypes.MAP_VEHICLE_BOX_CLICK,
    id: v_id
  }
}
