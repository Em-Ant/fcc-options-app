
var Ajax = require('../../js/ajax-functions.js');
var actionTypes = require('../constants/actionTypes/consumerActions.js');

module.exports.addConsumer = function(newConsumer, index) {
  return function (dispatch) {
    dispatch({
      type: actionTypes.CONSUMER_CREATE_LOADING
    });
    Ajax.post('/api/consumer/' + newConsumer._id, newConsumer, function(err, consumer) {
      if (err) {
        return dispatch({
          type: actionTypes.CONSUMER_CREATE_ERROR,
          error: err
        });
      }
      dispatch({
        type: actionTypes.CONSUMER_CREATE_SUCCESS,
        newConsumer: consumer,
        position: index
      })
    })
  }
}

module.exports.setEditMode = function (index) {
  return {
    type: actionTypes.CONSUMER_SET_EDIT_MODE,
    index: index
  };
}

module.exports.setAddMode = function () {
  return {
    type: actionTypes.CONSUMER_SET_ADD_MODE,
  };
}

module.exports.resetEditMode = function () {
  return {
    type: actionTypes.CONSUMER_RESET_EDIT_MODE,
  };
}

module.exports.setDeleteIndex = function (index) {
  return {
    type: actionTypes.CONSUMER_SET_ITEM_TO_DELETE,
    index: index
  };
}

module.exports.editConsumer = function(updatedConsumer, index) {
  return function (dispatch) {
    dispatch({
      type: actionTypes.CONSUMER_UPDATE_LOADING
    });
    Ajax.put('/api/consumer/' + updatedConsumer._id, updatedConsumer, function(err, consumer) {
      if (err) {
        return dispatch({
          type: actionTypes.CONSUMER_UPDATE_ERROR,
          error: err
        });
      }
      dispatch({
        type: actionTypes.CONSUMER_UPDATE_SUCCESS,
        updatedConsumer: consumer,
        position: index
      })
    })
  }
}

module.exports.deleteConsumer = function() {
  return function (dispatch, getState) {
    var index = getState().consumersPage.deleteIndex;
    var id = getState().consumersPage.consumers[index]._id;
    dispatch({
      type: actionTypes.CONSUMER_DELETE_LOADING
    });
    Ajax.delete('/api/consumer/' + id, {}, function(err, ok) {
      if (err) {
        return dispatch({
          type: actionTypes.CONSUMER_DELETE_ERROR,
          error: err
        });
      }
      dispatch({
        type: actionTypes.CONSUMER_DELETE_SUCCESS,
        position: index
      })
    })
  }
}

module.exports.addConsumer = function(newConsumer) {
  return function (dispatch) {
    dispatch({
      type: actionTypes.CONSUMER_CREATE_LOADING
    });
    Ajax.post('/api/consumer/', newConsumer, function(err, consumer) {
      if (err) {
        return dispatch({
          type: actionTypes.CONSUMER_CREATE_ERROR,
          error: err
        });
      }
      dispatch({
        type: actionTypes.CONSUMER_CREATE_SUCCESS,
        newConsumer: consumer
      })
    })
  }
}

module.exports.loadConsumers = function() {
  return function (dispatch) {
    dispatch({
      type: actionTypes.CONSUMER_SHOW_LOADING
    });
    Ajax.get('/api/consumer/', function(err, consumers) {
      if (err) {
        return dispatch({
          type: actionTypes.CONSUMER_SHOW_ERROR,
          error: err
        });
      }
      dispatch({
        type: actionTypes.CONSUMER_SHOW_SUCCESS,
        consumers: consumers
      })
    })
  }
}
