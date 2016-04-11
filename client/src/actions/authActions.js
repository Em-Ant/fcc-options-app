var Ajax = require('../../js/ajax-functions.js');
var actionTypes = require('../constants/actionTypes/authActionTypes');
var browserHistory = require("react-router").browserHistory;
var auth = require("../auth/auth");

function removeToken() {
  if (localStorage.token) {
    delete localStorage.token;
  }
}

module.exports.login = function(formData) {

  return function(dispatch) {
    dispatch({
      type: actionTypes.LOGIN_REQUEST,
    });
    removeToken();
    Ajax.post('/api/login', formData, function(err, user) {
      if (err) {
        dispatch({
          type: actionTypes.LOGIN_FAILURE,
          error:err
        });
        removeToken();
      } else {
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          user: user
        });
        localStorage.token = user;
        //the react router redux documentation says we can do this, however there is an alternative pure redux way to do this https://github.com/reactjs/react-router-redux
        browserHistory.push('/routes');
      }
    }.bind(this));
  }

}

var clientLogout = function(){
  removeToken();
  browserHistory.push('/');
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
