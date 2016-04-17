var Ajax = require('../../js/ajax-functions.js');
const LOADING = "LOADING";
const ERROR = "ERROR";
const SUCCESS = "SUCCESS";
const INDEX = "INDEX";
const CREATE = "CREATE";
const UPDATE = "UPDATE";
const DELETE = "DELETE";
const SET_EDIT_MODE = "SET_EDIT_MODE";
const SET_ADD_MODE = "SET_ADD_MODE";
const CLOSE_FORM = "CLOSE_FORM";

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

  this.create = function(newObj) {
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

  this.update = function(updatedObj) {
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


  this.setEditMode = function(id) {
    return{
      type:model + "_" + SET_EDIT_MODE,
      id:id
    }
  }

  this.setAddMode = function() {
    return{
      type:model + "_" + SET_ADD_MODE
    }
  }
  this.closeForm = function() {
    return{
      type:model + "_" + CLOSE_FORM
    }
  }



}

module.exports = ModelActions;
