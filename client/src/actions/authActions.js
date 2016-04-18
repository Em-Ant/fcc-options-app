var Ajax = require('../../js/ajax-functions.js');
var actionTypes = require('../constants/actionTypes/authActionTypes');
var browserHistory = require("react-router").browserHistory;

function removeUser() {
  if (localStorage.email) {
    delete localStorage.email;
  }
  if (localStorage.role) {
    delete localStorage.role;
  }
}

module.exports.login = function(formData) {

  return function(dispatch) {
    dispatch({
      type: actionTypes.LOGIN_REQUEST,
    });
    removeUser();
    Ajax.post('/api/login', formData, function(err, user) {
      if (err) {
        dispatch({
          type: actionTypes.LOGIN_FAILURE,
          error:err
        });
        removeUser();
      } else {
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          user: user
        });
        localStorage.email = user.email;
        localStorage.role = user.role;
        //the react router redux documentation says we can do this, however there is an alternative pure redux way to do this https://github.com/reactjs/react-router-redux
        browserHistory.push('/');
      }
    }.bind(this));
  }

}

var clientLogout = function(){
  removeUser();
  browserHistory.push('/login');
}

module.exports.clientLogout = clientLogout;

module.exports.logout = function() {
  return function(dispatch) {
    dispatch({
      type: actionTypes.LOGOUT_REQUEST,
    });
    Ajax.get('/api/logout', function(err, user) {
      if (err) {
        dispatch({
          type: actionTypes.LOGOUT_FAILURE,
          error:err
        });
      } else {
        dispatch({
          type: actionTypes.LOGOUT_SUCCESS
        });
        clientLogout();
      }
    }.bind(this));
  }
}


module.exports.fetchUser = function() {
  return function(dispatch) {
    dispatch({
      type: actionTypes.FETCH_USER_REQUEST,
    });
    Ajax.get('/api/user/me', function(err, response) {
      if (err) {
        dispatch({
          type: actionTypes.FETCH_USER_FAILURE,
          error:err
        });
        clientLogout();
      } else {
        dispatch({
          type: actionTypes.FETCH_USER_SUCCESS,
          response:response
        });
      }
    }.bind(this));
  }
}

module.exports.unauthorize = function() {
  return{
    type: actionTypes.UNAUTHORIZE,
  };
}

module.exports.requireAuth=function(nextState, replace) {
  if (!localStorage.email && !localStorage.role) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
