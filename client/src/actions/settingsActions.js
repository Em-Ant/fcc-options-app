var Ajax = require('../../js/ajax-functions.js');
var actionTypes = require('../constants/actionTypes/settingsActionTypes.js');

module.exports.load = function(settings) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.SETTINGS_LOAD_REQUEST
    });
    Ajax.get('/api/settings', function(err, settings) {
      if (err) {
        var message = "";
        if(err.responseJSON){
           message = err.responseJSON.msg;
        }
        dispatch({
          type: actionTypes.SETTINGS_LOAD_FAILURE,
          message: message
        });
      } else {
        dispatch({
          type: actionTypes.SETTINGS_LOAD_SUCCESS,
          settings
        });
      }
    });
  }
}
