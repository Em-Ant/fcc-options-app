var actionTypes = require('../constants/actionTypes/mapActionTypes.js');

var saveFilters = function(state, filters) {
  return Object.assign({}, state, filters)
}

var initState = {
  needsWave: true,
  behavioralIssues: true,
  needsTwoSeats: true,
  hasSeizures: true,
  hasWheelchair: true,
  hasMedications: true,
  noNeeds:true
}
var mapFiltersReducer = function(state, action) {
  state = state || initState;
  switch (action.type) {
    case (actionTypes.MAP_SAVE_FILTERS):
      return saveFilters(state, action.filters);
    default:
      return state;
  }
};

module.exports = mapFiltersReducer;
