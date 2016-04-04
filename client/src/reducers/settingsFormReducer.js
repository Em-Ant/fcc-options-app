var actionTypes = require('../constants/actionTypes/settingsFormActionTypes.js');

var updateRequest = function(state, settings) {

  return Object.assign({}, state, {
    isLoading: true
  },settings)
}

var updateFailure = function(state, message) {
  return Object.assign({}, state, {
    isLoading: false
  }, message)
}

var updateSuccess = function(state, settings) {
  return Object.assign({}, state, {
    isLoading: false,
  })
}

var initState = {
  isLoading: false
};
var settingsFormReducer = function(state, action) {
  state = state || initState;
  switch (action.type) {
    case actionTypes.SETTINGS_FORM_UPDATE_REQUEST:
      return updateRequest(state, action.settings);
    case actionTypes.SETTINGS_FORM_UPDATE_FAILURE:
      return updateFailure(state, action.message);
    case actionTypes.SETTINGS_FORM_UPDATE_SUCCESS:
      return updateSuccess(state);
    default:
      return state;
  }
};

module.exports = settingsFormReducer;
