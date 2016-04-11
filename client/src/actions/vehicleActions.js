var Ajax = require('../../js/ajax-functions.js');
var actionTypes = require('../constants/actionTypes/vehicleActionTypes');

module.exports.fetch = function() {

  return function(dispatch) {
    dispatch({
      type:"CALL_API",
      statusTypes:[
        actionTypes.FETCH_VEHICLES_REQUEST,
        actionTypes.FETCH_VEHICLES_FAILURE,
        actionTypes.FETCH_VEHICLES_SUCCESS
      ],
      method:'get',
      url:'/api/vehicle/'
    })
  }
}

module.exports.create = function(vehicle) {
  return function(dispatch) {
    dispatch({
      type:"CALL_API",
      statusTypes:[
        actionTypes.ADD_VEHICLE_REQUEST,
        actionTypes.ADD_VEHICLE_FAILURE,
        actionTypes.ADD_VEHICLE_SUCCESS
      ],
      data:vehicle,
      method:'post',
      url:'/api/vehicle/'
    })
  }
}

module.exports.update = function(vehicle) {
  return function(dispatch) {
    dispatch({
      type:"CALL_API",
      statusTypes:[
        actionTypes.UPDATE_VEHICLE_REQUEST,
        actionTypes.UPDATE_VEHICLE_FAILURE,
        actionTypes.UPDATE_VEHICLE_SUCCESS
      ],
      data:vehicle,
      method:'put',
      url:'/api/vehicle/'+ vehicle._id
    })
  }
}

module.exports.destroy = function(id) {
  return function(dispatch) {
    dispatch({
      type:"CALL_API",
      statusTypes:[
        actionTypes.DESTROY_VEHICLE_REQUEST,
        actionTypes.DESTROY_VEHICLE_FAILURE,
        actionTypes.DESTROY_VEHICLE_SUCCESS
      ],
      data:{},
      method:'delete',
      url:'/api/vehicle/'+ id
    })
  }
}


module.exports.setEditMode = function(id) {
  return{
    type:actionTypes.SET_VEHICLE_EDIT_MODE,
    id:id
  }
}

module.exports.setAddMode = function() {
  return{
    type:actionTypes.SET_VEHICLE_ADD_MODE
  }
}
module.exports.closeForm = function() {
  return{
    type:actionTypes.CLOSE_VEHICLE_FORM
  }
}
