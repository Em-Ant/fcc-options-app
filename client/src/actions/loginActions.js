var Ajax = require('../../js/ajax-functions.js');
var actionTypes = require('../constants/actionTypes/login.js');
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
          message: err.responseJSON.msg
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

module.exports.logout = function() {
  removeToken();
  browserHistory.push('/');
}
