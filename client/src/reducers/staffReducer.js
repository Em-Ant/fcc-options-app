var actionTypes = require('../constants/actionTypes/staffActionTypes');
var commonCRUD = require('../commons/commonReducerFunctions');

var staffReducer = function(state, action) {
  state = state || {
    ids: [],
    data: {},
    needToBeFetched: true
  };

  switch (action.type) {
    case actionTypes.STAFF_INDEX_LOADING:
      return commonCRUD.setRequested(state);
    case actionTypes.STAFF_INDEX_SUCCESS:
      return commonCRUD.load(state, action.response);
    case actionTypes.STAFF_INDEX_FAILURE:
      return commonCRUD.fetchError(state, action.response);
    case actionTypes.STAFF_CREATE_SUCCESS:
      return commonCRUD.add(state, action.response);
    case actionTypes.STAFF_UPDATE_SUCCESS:
      return commonCRUD.update(state, action.response);
    case actionTypes.STAFF_DELETE_SUCCESS:
      return commonCRUD.destroy(state, action.response);
    default:
      return state;
  }
};

module.exports = staffReducer;
