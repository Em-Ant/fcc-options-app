
var actionTypes = require('../constants/actionTypes/userActionTypes.js');
var commons = require('../commons/commonReducerFunctions');


// TODO: HANDLE ERRORS
var reducer = function(state, action) {
  state = state || {ids:[], data:{}, needToBeFetched: true};
  switch (action.type){
    case actionTypes.USER_INDEX_LOADING:
      return commons.setRequested(state);
    case actionTypes.USER_INDEX_SUCCESS:
      return commons.load(state, action.users);
    case actionTypes.USER_INDEX_ERROR:
      return commons.fetchError(state);
    case actionTypes.USER_UPDATE_ROLE_SUCCESS:
      return commons.update(state, action.updatedUser);
    case actionTypes.USER_CREATE_SUCCESS:
      return commons.add(state, action.newUser);
    case actionTypes.USER_DELETE_SUCCESS:
      return commons.destroy(state, action.id);
    default:
      return state;
  }
};

module.exports = reducer;
