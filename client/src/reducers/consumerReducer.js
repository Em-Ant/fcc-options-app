
var actionTypes = require('../constants/actionTypes/consumerActionTypes.js');
var commonCRUD = require('../commons/commonReducerFunctions');


// TODO: HANDLE ERRORS
var reducer = function(state, action) {
  state = state || {ids:[], data:{}};
  switch (action.type){
    case actionTypes.CONSUMER_INDEX_SUCCESS:
      return commonCRUD.load(state, action.consumers);
    case actionTypes.CONSUMER_UPDATE_SUCCESS:
      return commonCRUD.update(state, action.updatedConsumer);
    case actionTypes.CONSUMER_CREATE_SUCCESS:
      return commonCRUD.add(state, action.newConsumer);
    case actionTypes.CONSUMER_DELETE_SUCCESS:
      return commonCRUD.destroy(state, action.id);
    default:
      return state;
  }
};

module.exports = reducer;
