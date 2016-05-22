var actionTypes = require('../constants/actionTypes/modelActionTypes');
const VEHICLES = require('../constants/models').VEHICLES;
const CONSUMERS = require('../constants/models').CONSUMERS;
var commonCRUD = require('../commons/commonReducerFunctions');
var mapActions = require('../constants/actionTypes/mapActionTypes.js');
var vehicleRouteActions = require('../constants/actionTypes/vehicleRouteActionTypes.js');
var _ = require('lodash');

function updateConsumersArray(state, v_id, cArray) {
  var data = Object.assign({}, state.data);

  var vehicle = Object.assign({}, state.data[v_id]);
  vehicle.consumers = cArray.slice();
  vehicle.optimized = undefined;
  vehicle.maxPassengerDuration = undefined;
  data[v_id] = vehicle;

  return Object.assign({}, state, {
    data: data,
  });

};

function removeConsumerFromVehicle(state, consumerId) {
  var vehicleId = state.consumersToVehiclesMap[consumerId];
  if (!vehicleId) {
    return state;
  }
  var newState = _.cloneDeep(state);
  var consumers = newState.data[vehicleId].consumers;
  var consumerIndexToRemove = consumers.indexOf(consumerId);
  consumers.splice(consumerIndexToRemove, 1);
  return newState;
}

var mapConsumersToVehicles = function(state) {
  var consumersToVehiclesMap = {};
  state.ids.forEach(function(v_id) {
    var vehicle = state.data[v_id];
    vehicle.consumers.forEach(function(c_id){
      if(consumersToVehiclesMap[c_id]) {
        console.err(`Consumer ${c_id} is assigned to
          ${consumersToVehiclesMap[c_id]} and ${v_id}`);
      } else {
        consumersToVehiclesMap[c_id] = v_id;
      }
    })
  })
  return Object.assign({}, state, {
    consumersToVehiclesMap: consumersToVehiclesMap
  })
}

var setAmMaxPassDuration = function(state, directions) {
  var vehicle = Object.assign({}, state.data[directions.v_id]);
  var data = Object.assign({}, state.data);
  vehicle.maxPassengerDuration
    = Math.ceil(directions.morningRoute.maxPassengerDuration/60);
  data[directions.v_id] = vehicle;
  return Object.assign({}, state, {data: data});
}
var vehiclesReducer = function(state, action) {
  state = state || {
    ids: [],
    data: {},
    consumersToVehiclesMap: {},
    needToBeFetched: true
  };
  switch (action.type) {
    case 'ADD_WPT_SUCCESS':
    case 'EDIT_WPT_SUCCESS':
    case 'RESET_WPT_SUCCESS':
      return commonCRUD.update(state, action.vehicle)
    case mapActions.MAP_REMOVE_FROM_ACTIVE_BUS_SUCCESS:
    case mapActions.MAP_ADD_TO_ACTIVE_BUS_SUCCESS:
      var newState =  updateConsumersArray(state, action.v_id, action.consumersArray);
      return mapConsumersToVehicles(newState);
    case vehicleRouteActions.OPTIMIZE_ROUTE_SUCCESS:
      return commonCRUD.update(state, action.vehicle);
    case vehicleRouteActions.DIRECTIONS_LOAD_SUCCESS:
      return setAmMaxPassDuration(state, action.response);
    case actionTypes.DELETE:
      if(action.model === CONSUMERS
        && action.status === actionTypes.SUCCESS) {
      var newState = removeConsumerFromVehicle(state, action.id);
      return mapConsumersToVehicles(newState);
    }
  }

  if (action.model != VEHICLES) {
    return state
  }

  switch (action.type) {
    case actionTypes.FETCH:
      if (action.status == actionTypes.LOADING)
        return commonCRUD.setRequested(state);
      if (action.status == actionTypes.SUCCESS){
        var newState = commonCRUD.load(state, action.response);
        return mapConsumersToVehicles(newState);
      }
      if (action.status == actionTypes.ERROR)
        return commonCRUD.fetchError(state, action.error);
    case actionTypes.CREATE:
      if (action.status == actionTypes.SUCCESS)
        return commonCRUD.add(state, action.response);
    case actionTypes.UPDATE:
      if (action.status == actionTypes.SUCCESS)
        return commonCRUD.update(state, action.response);
    case actionTypes.DELETE:
      if (action.status == actionTypes.SUCCESS){
        var newState = commonCRUD.destroy(state, action.id);
        return mapConsumersToVehicles(newState);
      }
    default:
      return state;
  }
};

module.exports = vehiclesReducer;
