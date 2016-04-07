
var actionTypes = require('../constants/actionTypes/consumerActionTypes.js');
var commons = require('../commons/commonReducerFunctions');


// TODO: HANDLE ERRORS
var reducer = function(state, action) {
  state = state || {ids:[], data:{}, needToBeFetched: true};
  switch (action.type){
    case actionTypes.CONSUMER_INDEX_LOADING:
      return commons.setRequested(state);
    case actionTypes.CONSUMER_INDEX_SUCCESS:
      return commons.load(state, action.consumers);
    case actionTypes.CONSUMER_UPDATE_SUCCESS:
      return commons.update(state, action.updatedConsumer);
    case actionTypes.CONSUMER_CREATE_SUCCESS:
      return commons.add(state, action.newConsumer);
    case actionTypes.CONSUMER_DELETE_SUCCESS:
      return commons.destroy(state, action.id);
    default:
      return state;
  }
};

module.exports = reducer;
