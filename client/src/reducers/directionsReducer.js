var actionTypes = require('../constants/actionTypes/mapActionTypes.js');

var loadDirections = function (state, directions) {
    return Object.assign({}, state, directions)
}
var initState={
  routes:[{
      legs:[],
      overview_path:[]
    }]
}

var reducer = function(state, action) {
  state = state || initState;
  switch (action.type){
    case (actionTypes.DIRECTIONS_LOAD_SUCCESS) :
      return loadDirections(state, action.response)
    default:
      return state;
  }
};

module.exports = reducer;
