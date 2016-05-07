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
    default:
      return state;
  }
};

module.exports = mapFiltersReducer;
