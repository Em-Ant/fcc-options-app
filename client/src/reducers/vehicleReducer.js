var actionTypes = require('../constants/actionTypes/vehicleActionTypes');
var consumerActionTypes = require('../constants/actionTypes/consumerActionTypes');
var commonCRUD = require('../commons/commonReducerFunctions');
var mapActions = require('../constants/actionTypes/mapActionTypes.js');
var _ = require('lodash');

function updateConsumersArray(state, v_id, cArray) {
  var data = Object.assign({}, state.data);

  var vehicle = Object.assign({}, state.data[v_id]);
  var consumers = vehicle.consumers.slice();
  vehicle.consumers = cArray.slice();
  data[v_id] = vehicle;

  return Object.assign({}, state, {
    data: data,
  });

};

function removeConsumerFromVehicle(state, consumerId) {
  var vehicleId = getConsumerVehicleId(state.ids, state.data, consumerId)
  if (!vehicleId) {
    return state;
  }
  var newState = _.cloneDeep(state);
  var consumers = newState.data[vehicleId].consumers;
  var consumerIndexToRemove = consumers.indexOf(consumerId);
  consumers.splice(consumerIndexToRemove, 1);
  return newState;
}

// TODO:  replace with consumerVehiclesMap or add vehicle id to consumer
function getConsumerVehicleId(vehicleIds, vehicles, consumerIdToFind) {
  for (var i = 0; i < vehicleIds.length; i++) {
    var vehicle = vehicles[vehicleIds[i]];
    var index = vehicle.consumers.indexOf(consumerIdToFind);
    if (index !== -1) {
      return vehicleIds[i];
    }
  }
  return null;
}

var vehiclesReducer = function(state, action) {
  state = state || {
    ids: [],
    data: {},
    needToBeFetched: true
  };
  switch (action.type) {
    case actionTypes.FETCH_VEHICLES_REQUEST:
      return commonCRUD.setRequested(state);
    case actionTypes.FETCH_VEHICLES_SUCCESS:
      return commonCRUD.load(state, action.response);
    case actionTypes.FETCH_VEHICLES_FAILURE:
      return commonCRUD.fetchError(state, action.response);
    case actionTypes.ADD_VEHICLE_SUCCESS:
      return commonCRUD.add(state, action.response);
    case actionTypes.UPDATE_VEHICLE_SUCCESS:
      return commonCRUD.update(state, action.response);
    case actionTypes.DESTROY_VEHICLE_SUCCESS:
      return commonCRUD.destroy(state, action.response);
    case mapActions.MAP_REMOVE_FROM_ACTIVE_BUS_SUCCESS:
    case mapActions.MAP_ADD_TO_ACTIVE_BUS_SUCCESS:
      return updateConsumersArray(state, action.v_id, action.consumersArray);
    case consumerActionTypes.CONSUMER_DELETE_SUCCESS:
      return removeConsumerFromVehicle(state, action.id);
    default:
      return state;
  }
};

module.exports = vehiclesReducer;
