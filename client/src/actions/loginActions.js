var Ajax = require('../../js/ajax-functions.js');
var LOGIN_REQUEST = exports.LOGIN_REQUEST = 'LOGIN_REQUEST';
var LOGIN_FAILURE = exports.LOGIN_FAILURE = 'LOGIN_FAILURE';
var LOGIN_SUCCESS = exports.LOGIN_SUCCESS = 'LOGIN_SUCCESS';
var browserHistory = require("react-router").browserHistory;

module.exports.login = function(formData) {

  return function(dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    Ajax.post('/api/login', formData, function(err, user) {
      if (err) {
        dispatch({
          type: LOGIN_FAILURE,
          message: err.responseJSON.msg
        });
      } else {
        dispatch({
          type: LOGIN_SUCCESS
        });
        //the react router redux documentation says we can do this, however there is an alternative pure redux way to do this https://github.com/reactjs/react-router-redux
        
        browserHistory.push('/routes');
      }
    }.bind(this));
  }

}
