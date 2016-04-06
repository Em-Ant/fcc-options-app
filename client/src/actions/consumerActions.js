
var Ajax = require('../../js/ajax-functions.js');
var actionTypes = require('../constants/actionTypes/consumerActionTypes.js');

module.exports.loadConsumers = function() {
  return function (dispatch) {
    dispatch({
      type: actionTypes.CONSUMER_INDEX_LOADING
    });
    Ajax.get('/api/consumer/', function(err, consumers) {
      if (err) {
        return dispatch({
          type: actionTypes.CONSUMER_INDEX_ERROR,
          error: err
        });
      }
      dispatch({
        type: actionTypes.CONSUMER_INDEX_SUCCESS,
        consumers: consumers
      })

      //TODO remove.  This is just for demo
      var normalize = require('normalizr').normalize;
      var Schema = require('normalizr').Schema;
      var arrayOf = require('normalizr').arrayOf;
      const consumer = new Schema('consumers',{ idAttribute: '_id' });
      console.log("before normalizing consumers", consumers);
      consumers = normalize(consumers, arrayOf(consumer));
      console.log("after normalizing consumers", consumers);
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

module.exports.editConsumer = function(updatedConsumer) {
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
        updatedConsumer: consumer
      })
    })
  }
}

module.exports.deleteConsumer = function() {
  return function (dispatch, getState) {
    var id = getState().consumersForm.deleteId;
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
        id: id
      })
    })
  }
}

module.exports.setEditMode = function (id) {
  return {
    type: actionTypes.CONSUMER_SET_EDIT_MODE,
    id: id
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

module.exports.setDeleteId = function (id) {
  return {
    type: actionTypes.CONSUMER_SET_ITEM_TO_DELETE,
    id: id
  };
}
