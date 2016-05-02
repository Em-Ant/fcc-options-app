var Ajax = require('../../js/ajax-functions.js');
var actionTypes = require('../constants/actionTypes/modelActionTypes');
var endpoints = require('../constants/modelEndpoints');

function ModelActions(model) {
  var endpoint = endpoints[model];

  this.fetch = function() {
    return function(dispatch) {
      dispatch({
        type: actionTypes.FETCH,
        status: actionTypes.LOADING,
        model: model
      });
      Ajax.get(endpoint, function(err, response) {
        if (err) {
          return dispatch({
            type: actionTypes.FETCH,
            status: actionTypes.ERROR,
            model: model,
            error: err
          });
        }
        dispatch({
          type: actionTypes.FETCH,
          status: actionTypes.SUCCESS,
          model: model,
          response: response
        })
      })
    }
  }

  this.create = function(newObj) {
    return function(dispatch) {
      dispatch({
        type: actionTypes.CREATE,
        status: actionTypes.LOADING,
        model: model
      });
      Ajax.post(endpoint, newObj, function(err, response) {
        if (err) {
          return dispatch({
            type: actionTypes.CREATE,
            status: actionTypes.ERROR,
            model: model,
            error: err
          });
        }
        dispatch({
          type: actionTypes.CREATE,
          status: actionTypes.SUCCESS,
          model: model,
          response: response
        })
      })
    }
  }

  this.update = function(updatedObj) {
    return function(dispatch) {
      dispatch({
        type: actionTypes.UPDATE,
        status: actionTypes.LOADING,
        model: model
      });
      Ajax.put(endpoint + updatedObj._id, updatedObj, function(err, response) {
        if (err) {
          return dispatch({
            type: actionTypes.UPDATE,
            status: actionTypes.ERROR,
            model: model,
            error: err
          });
        }
        dispatch({
          type: actionTypes.UPDATE,
          status: actionTypes.SUCCESS,
          model: model,
          response: response
        })
      })
    }
  }

  this.delete = function(id) {
    return function(dispatch) {
      dispatch({
        type: actionTypes.DELETE,
        status: actionTypes.LOADING,
        model: model
      });
      Ajax.delete(endpoint + id, {}, function(err, ok) {
        if (err) {
          return dispatch({
            type: actionTypes.DELETE,
            status: actionTypes.ERROR,
            model: model,
            error: err
          });
        }
        dispatch({
          type: actionTypes.DELETE,
          status: actionTypes.SUCCESS,
          model: model,
          id: id
        })
      })
    }
  }


  this.setEditMode = function(id) {
    return{
      type: actionTypes.SET_EDIT_MODE,
      model: model,
      id:id
    }
  }

  this.setAddMode = function() {
    return{
      type: actionTypes.SET_ADD_MODE,
      model: model
    }
  }
  this.closeForm = function() {
    return{
      type: actionTypes.CLOSE_FORM,
      model: model
    }
  }

  this.setPage = function(page) {
    return {
      type: actionTypes.SET_PAGE,
      model: model,
      page: page
    }
  }


}

module.exports = ModelActions;
