const STAFF = require('../constants/models').STAFF;
var modelPageReducer = require('./modelPageReducer');

var initState = {
  isLoading: false,
  form: {
    display: false
  }
};
var staffPageReducer = function(state, action) {
  state = state || initState;
  if (action.model != STAFF) {
    return state
  }

  return modelPageReducer(state, action);
};

module.exports = staffPageReducer;
