var actionTypes = require('../constants/actionTypes/settingsActionTypes.js');

var settingsUpdateRequest = function(state, settings) {

  return Object.assign({}, state, {
    isLoading: true
  },settings)
}

var settingsUpdateFailure = function(state, message) {
  return Object.assign({}, state, {
    isLoading: false
  }, message)
}

var settingsUpdateSuccess = function(state, settings) {
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
    case actionTypes.SETTINGS_UPDATE_REQUEST:
      return settingsUpdateRequest(state, action.settings);
    case actionTypes.SETTINGS_UPDATE_FAILURE:
      return settingsUpdateFailure(state, action.message);
    case actionTypes.SETTINGS_UPDATE_SUCCESS:
      return settingsUpdateSuccess(state);
    default:
      return state;
  }
};

module.exports = settingsFormReducer;
