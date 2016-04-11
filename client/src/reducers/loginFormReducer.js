var actionTypes = require('../constants/actionTypes/authActionTypes');

var loginRequest = function(state){
  return Object.assign({}, state, {
    isLoading:true,
  })
}

var loginFailure = function(state, error){
  return Object.assign({}, state, {
    isLoading:false,
    message:error.responseJSON.msg
  })
}

var loginSuccess = function(state, user){
  return Object.assign({}, state, {
    isLoading:false
  })
}

var initState = {
  isLoading:false
};
var loginFormReducer = function(state, action) {
  state = state || initState;
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return loginRequest(state);
    case actionTypes.LOGIN_FAILURE:
      return loginFailure(state, action.error);
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action.user);
    default:
      return state;
  }
};

module.exports = loginFormReducer;
