var actionTypes = require('../constants/actionTypes/modelActionTypes');
const STAFF = require('../constants/models').STAFF;
var commonCRUD = require('../commons/commonReducerFunctions');

var staffReducer = function(state, action) {
  state = state || {
    ids: [],
    data: {},
    needToBeFetched: true
  };

  if (action.model != STAFF) {
    return state
  }

  switch (action.type) {
    case actionTypes.FETCH:
      if (action.status == actionTypes.LOADING)
        return commonCRUD.setRequested(state);
      if (action.status == actionTypes.SUCCESS)
        return commonCRUD.load(state, action.response);
      if (action.status == actionTypes.ERROR)
        return commonCRUD.fetchError(state, action.error);
    case actionTypes.CREATE:
      if (action.status == actionTypes.SUCCESS)
        return commonCRUD.add(state, action.response);
    case actionTypes.UPDATE:
      if (action.status == actionTypes.SUCCESS)
        return commonCRUD.update(state, action.response);
    case actionTypes.DELETE:
      if (action.status == actionTypes.SUCCESS)
        return commonCRUD.destroy(state, action.response);
    default:
      return state;
  }
};

module.exports = staffReducer;
