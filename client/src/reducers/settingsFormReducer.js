var actionTypes = require('../constants/actionTypes/modelActionTypes');
const SETTINGS = require('../constants/models').SETTINGS;

var updateRequest = function(state) {

  return Object.assign({}, state, {
    isLoading: true,
    message:null
  })
}

var updateError = function(state, error) {
  return Object.assign({}, state, {
    isLoading: false,
    message:{
      type:"error",
      msg:error.responseJSON.msg
    }
  })
}

var update = function(state, settings) {
  return Object.assign({}, state, {
    isLoading: false,
    message:{
      type:"success",
      msg:"Settings Updated!"
    },
  }, settings)
}

var initState = {
  isLoading: false
};
var settingsFormReducer = function(state, action) {
  state = state || initState;
  if (action.model != SETTINGS) {
    return state
  }
  switch (action.type) {
    case actionTypes.UPDATE:
      if (action.status == actionTypes.LOADING)
        return updateRequest(state);
      if (action.status == actionTypes.SUCCESS)
        return update(state, action.response);
      if (action.status == actionTypes.ERROR)
        return updateError(state, action.error);
    default:
      return state;
  }
};

module.exports = settingsFormReducer;
