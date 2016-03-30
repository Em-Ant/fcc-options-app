var actionTypes = require('../actions/loginActions.js');

var loginRequest = function(state){
  return Object.assign({}, state, {
    isLoading:true
  })
}

var loginFailure = function(state, message){
  return Object.assign({}, state, {
    isLoading:false,
    message:message
  })
}

var loginSuccess = function(state, message){
  return Object.assign({}, state, {
    isLoading:false
  })
}

var initState = {
  isLoading:false
};
var loginReducer = function(state, action) {
  state = state || initState;
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return loginRequest(state);
    case actionTypes.LOGIN_FAILURE:
      return loginFailure(state, action.message);
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state);
    default:
      return state;
  }
};

module.exports = loginReducer;
