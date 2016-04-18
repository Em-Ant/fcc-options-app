var actionTypes = require('../constants/actionTypes/modelActionTypes');
const VEHICLES = require('../constants/models').VEHICLES;
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
    case mapActions.MAP_REMOVE_FROM_ACTIVE_BUS_SUCCESS:
    case mapActions.MAP_ADD_TO_ACTIVE_BUS_SUCCESS:
      return updateConsumersArray(state, action.v_id, action.consumersArray);
    case consumerActionTypes.CONSUMER_DELETE_SUCCESS:
      return removeConsumerFromVehicle(state, action.id);
  }

  if (action.model != VEHICLES) {
    return state
  }

  switch (action.type) {
    case actionTypes.FETCH:
      if (action.status == actionTypes.LOADING)
        return commonCRUD.setRequested(state);
      if (action.status == actionTypes.SUCCESS)
        return commonCRUD.load(state, action.response);
      if (action.status == actionTypes.ERROR)
        return commonCRUD.fetchError(state, action.error);
    case actionTypes.CREATE:
      if (action.status == actionTypes.SUCCESS)
        return commonCRUD.add(state, action.response);
    case actionTypes.UPDATE:
      if (action.status == actionTypes.SUCCESS)
        return commonCRUD.update(state, action.response);
    case actionTypes.DELETE:
      if (action.status == actionTypes.SUCCESS)
        return commonCRUD.destroy(state, action.response);
    default:
      return state;
  }
};

module.exports = vehiclesReducer;
