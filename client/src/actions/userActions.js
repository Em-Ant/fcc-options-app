
var Ajax = require('../../js/ajax-functions.js');
var actionTypes = require('../constants/actionTypes/userActionTypes.js');

module.exports.loadUsers = function() {
  return function (dispatch) {
    dispatch({
      type: actionTypes.USER_INDEX_LOADING
    });
    Ajax.get('/api/user/', function(err, users) {
      if (err) {
        return dispatch({
          type: actionTypes.USER_INDEX_ERROR,
          error: err
        });
      }
      dispatch({
        type: actionTypes.USER_INDEX_SUCCESS,
        users: users
      })
    })
  }
}

module.exports.setAddMode = function () {
  return {
    type: actionTypes.USER_SET_ADD_MODE,
  };
}

module.exports.setEditMode = function (id) {
  return {
    type: actionTypes.USER_SET_EDIT_MODE,
    id: id
  };
}

module.exports.editUserRole = function(updatedUser) {
  return function (dispatch) {
    dispatch({
      type: actionTypes.USER_UPDATE_ROLE_LOADING
    });
    Ajax.post('/api/user/' + updatedUser._id, updatedUser, function(err, user) {
      if (err) {
        return dispatch({
          type: actionTypes.USER_UPDATE_ROLE_ERROR,
          error: err
        });
      }
      console.log('updated',user);
      dispatch({
        type: actionTypes.USER_UPDATE_ROLE_SUCCESS,
        updatedUser: updatedUser
      })
    })
  }
}

module.exports.addUser = function(newUser) {
  return function (dispatch) {
    dispatch({
      type: actionTypes.USER_CREATE_LOADING
    });
    Ajax.post('/api/user/', newUser, function(err, user) {
      if (err) {
        return dispatch({
          type: actionTypes.USER_CREATE_ERROR,
          error: err
        });
      }
      dispatch({
        type: actionTypes.USER_CREATE_SUCCESS,
        newUser: user
      })
    })
  }
}

module.exports.resetEditMode = function () {
  return {
    type: actionTypes.USER_RESET_EDIT_MODE,
  };
}

/*




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







module.exports.setDeleteId = function (id) {
  return {
    type: actionTypes.CONSUMER_SET_ITEM_TO_DELETE,
    id: id
  };
}
*/
