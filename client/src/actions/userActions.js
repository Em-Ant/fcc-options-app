
var Ajax = require('../../js/ajax-functions.js');
var actionTypes = require('../constants/actionTypes/userActionTypes.js');


module.exports.resetPassword = function(id) {
  return function (dispatch) {
    dispatch({
      type: actionTypes.USER_RESET_PWD_LOADING
    });
    Ajax.post('/api/user/' + id +'/reset-pwd', {}, function(err, ok) {
      if (err) {
        return dispatch({
          type: actionTypes.USER_RESET_PWD_ERROR,
          error: err
        });
      }
      dispatch({
        type: actionTypes.USER_RESET_PWD_SUCCESS,
        id: id
      })
    })
  }
}
