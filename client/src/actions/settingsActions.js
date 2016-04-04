var Ajax = require('../../js/ajax-functions.js');
var actionTypes = require('../constants/actionTypes/settingsActionTypes.js');
var browserHistory = require("react-router").browserHistory;

module.exports.update = function(settings) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.SETTINGS_UPDATE_REQUEST,
      settings:settings
    });
    Ajax.post('/api/settings', settings, function(err, updatedSettings) {
      if (err) {
        var message = "";
        if(err.responseJSON){
           message = err.responseJSON.msg;
        }
        dispatch({
          type: actionTypes.SETTINGS_UPDATE_FAILURE,
          message: message
        });
      } else {
        dispatch({
          type: actionTypes.SETTINGS_UPDATE_SUCCESS,
          settings: updatedSettings
        });
      }
    });
  }
}
