var actionTypes = require('../constants/actionTypes/mapFilterActionTypes.js');
var modelActionTypes = require('../constants/actionTypes/modelActionTypes');
const VEHICLES = require('../constants/models').VEHICLES;

var updateFilter = function (state, filterName, value) {
  var newFilter = {};
  newFilter[filterName] = value;
  return Object.assign({}, state, newFilter);
}
var updateVehicleFilter = function (state, vehicleId, value) {
  var vehicleIds = state.vehicleIds.slice();
  if (value) {
    vehicleIds.push(vehicleId)
  } else {
    var index = vehicleIds.indexOf(vehicleId);
    vehicleIds.splice(index, 1);
  }
  return Object.assign({}, state, {
    vehicleIds: vehicleIds
  });
}
var setAllNeedFilters = function (state, value) {
  return Object.assign({}, state, {
    needsWave: value,
    behavioralIssues: value,
    needsTwoSeats: value,
    hasSeizures: value,
    hasWheelchair: value,
    hasMedications: value,
    noNeeds: value
  })
}
var setAllVehicleFilters = function (state, vehicleIds, value) {
  vehicleIds =  vehicleIds.slice();
  if (value) {
    return Object.assign({}, state, {
      vehicleUnassigned: value,
      vehicleIds: vehicleIds
    })
  } else {
    return Object.assign({}, state, {
      vehicleUnassigned: value,
      vehicleIds: []
    })
  }

}
var initState = {
  needsWave: true,
  behavioralIssues: true,
  needsTwoSeats: true,
  hasSeizures: true,
  hasWheelchair: true,
  hasMedications: true,
  noNeeds: true,
  vehicleUnassigned: true,
  vehicleIds: []
}
var mapFiltersReducer = function (state, action) {
  state = state || initState;
  switch (action.type) {
  case (actionTypes.FILTER_UPDATE):
    return updateFilter(state, action.filterName, action.value);
  case (actionTypes.FILTER_VEHICLE_UPDATE):
    return updateVehicleFilter(state, action.vehicleId, action.value);
  case (actionTypes.FILTER_SET_ALL_NEEDS):
    return setAllNeedFilters(state, action.value);
  case (actionTypes.FILTER_SET_ALL_VEHICLES):
    return setAllVehicleFilters(state, action.vehicleIds, action.value);
  case modelActionTypes.FETCH:
    if (action.model == VEHICLES && action.status == modelActionTypes.SUCCESS) {
      action.response.forEach(function (vehicle) {
        state = updateVehicleFilter(state, vehicle._id, true)
      })
      return state;
    }
  case modelActionTypes.CREATE:
    if (action.model == VEHICLES && action.status == modelActionTypes.SUCCESS) {
      return updateVehicleFilter(state, action.response._id, true)
    }
  case modelActionTypes.DELETE:
    if (action.model == VEHICLES && action.status == modelActionTypes.SUCCESS) {
      return updateVehicleFilter(state, action.id, false)
    }
  default:
    return state;
  }
};

module.exports = mapFiltersReducer;
