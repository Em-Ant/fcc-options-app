
var Ajax = require('../../js/ajax-functions.js');

function setConsumersLoading() {
  return {
    type: 'CONSUMER_SHOW_LOADING'
  }
}

module.exports.loadConsumers = function() {
  return function (dispatch) {
    dispatch(setConsumersLoading());
    Ajax.get('/api/consumer/', function(err, consumers) {
      if (err) {
        return dispatch({
          type: 'CONSUMER_SHOW_ERROR',
          error: err
        });
      }
      dispatch({
        type: 'CONSUMER_SHOW_SUCCESS',
        consumers: consumers
      })
    })
  }
}
