var actionTypes = require('../constants/actionTypes/modelActionTypes');
const SETTINGS = require('../constants/models').SETTINGS;

var loadRequest = function(state) {
  return Object.assign({}, state, {
    needToBeFetched: undefined
  });
}
var loadFailure = function(state) {
  return Object.assign({}, state, {
    needToBeFetched: true,
    fetchError: true});
  return state;
}
var loadSuccess = function(state, settings) {
  return Object.assign({}, state, settings);
}
var update = function(state, settings) {
  return Object.assign({}, state, settings);
}

var settingsFormReducer = function(state, action) {
  state = state || {needToBeFetched:true};
  if (action.model != SETTINGS) {
    return state
  }
  switch (action.type) {
    case actionTypes.FETCH:
      if (action.status == actionTypes.LOADING)
        return loadRequest(state);
      if (action.status == actionTypes.SUCCESS)
        return loadSuccess(state, action.response);
      if (action.status == actionTypes.ERROR)
        return loadFailure(state, action.error);
    case actionTypes.UPDATE:
      if (action.status == actionTypes.SUCCESS)
        return update(state, action.response);
    default:
      return state;
  }
};

module.exports = settingsFormReducer;
