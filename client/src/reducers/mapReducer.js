
function(state)
var initState = {};

var reducer = function(state, action) {
  state = state || initState;
  switch (action.type){
    case actionTypes.CONSUMER_INDEX_SUCCESS:
      return displayConsumersOnMap(state);
    default:
      return state;
  }
};

module.exports = reducer;
