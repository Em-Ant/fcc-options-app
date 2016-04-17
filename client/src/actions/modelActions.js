var Ajax = require('../../js/ajax-functions.js');
const LOADING = "LOADING";
const ERROR = "ERROR";
const SUCCESS = "SUCCESS";
const INDEX = "INDEX";
const CREATE = "CREATE";
const UPDATE = "UPDATE";
const DELETE = "DELETE";

function ModelActions(model) {
  var endpoint = getEndpoint(model);

  function getEndpoint(model) {
    switch (model) {
      case "STAFF":
       return '/api/staff/';
    }
  }
  this.fetch = function() {
    return function(dispatch) {
      dispatch({
        type: model + "_" + INDEX + "_" + LOADING
      });
      Ajax.get(endpoint, function(err, response) {
        if (err) {
          return dispatch({
            type: model + "_" + INDEX + "_" + ERROR,
            error: err
          });
        }
        dispatch({
          type: model + "_" + INDEX + "_" + SUCCESS,
          response: response
        })
      })
    }
  }

  this.add = function(newObj) {
    return function(dispatch) {
      dispatch({
        type: model + "_" + CREATE + "_" + LOADING
      });
      Ajax.post(endpoint, newObj, function(err, response) {
        if (err) {
          return dispatch({
            type: model + "_" + CREATE + "_" + ERROR,
            error: err
          });
        }
        dispatch({
          type: model + "_" + CREATE + "_" + SUCCESS,
          response: response
        })
      })
    }
  }

  this.edit = function(updatedObj) {
    var endpoint = getEndpoint(model);
    return function(dispatch) {
      dispatch({
        type: model + "_" + UPDATE + "_" + LOADING
      });
      Ajax.put(endpoint + updatedObj._id, updatedObj, function(err, response) {
        if (err) {
          return dispatch({
            type: model + "_" + UPDATE + "_" + ERROR,
            error: err
          });
        }
        dispatch({
          type: model + "_" + UPDATE + "_" + SUCCESS,
          response: response
        })
      })
    }
  }

  this.delete = function(id) {
    return function(dispatch) {
      dispatch({
        type: model + "_" + DELETE + "_" + LOADING
      });
      Ajax.delete(endpoint + id, {}, function(err, ok) {
        if (err) {
          return dispatch({
            type: model + "_" + DELETE + "_" + ERROR,
            error: err
          });
        }
        dispatch({
          type: model + "_" + DELETE + "_" + SUCCESS,
          id: id
        })
      })
    }
  }
}

module.exports = ModelActions;
