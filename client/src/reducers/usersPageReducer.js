
var actionTypes = require('../constants/actionTypes/userActionTypes.js');

function loadingUsers(state) {
  return Object.assign({}, state, {
    loadingUsers: true,
  });
}

function setUsers(state) {
  return Object.assign({}, state, {
    loadingUsers: undefined
  })
}

function updatingUsers(state) {
  return Object.assign({}, state, {
    loadingUsers: true,
    updatingUsers: true,
    message: undefined
  });
}


function updateUser (state) {
    return Object.assign({}, state, {
      updatingUsers: undefined,
      loadingUsers: undefined,
      editId: undefined,
      displayForm: undefined,
      message: undefined
    });
}

function addUser (state) {

    return Object.assign({}, state, {
      updatingUsers: undefined,
      loadingUsers: undefined,
      displayForm: undefined,
      message: undefined
    });
}

// TODO: Handle error message display in Error Handlers

function setErrorOnPageLoading(state, error) {
  return Object.assign({}, state, {

    updatingUsers: undefined,
    loadingUsers: undefined
  });
}

function setError(state, error) {
  return Object.assign({}, state, {

    // Reset Spinners
    updatingUsers: undefined,
    loadingUsers: undefined,
    message: error.responseJSON
  });
}

function setEditMode (state, id) {
  return Object.assign({}, state, {
    editId: id,
    displayForm: true
  })
}

function resetEditMode (state) {
  return Object.assign({}, state, {
    editId: undefined,
    displayForm: undefined,
    message: undefined
  })
}

function clearErr (state) {
  if (state.message) {
    return Object.assign({}, state, {message: undefined})
  }
  return state;
}

function deleteConsumer (state) {
    return Object.assign({}, state, {
      updatingConsumers: undefined,
      loadingConsumers: undefined,
      deleteId: undefined,
      updatingConsumers: undefined,
      loadingConsumers: undefined,
      displayForm: undefined,
      message: undefined
    });
}





function setItemToDelete(state, id) {
  return Object.assign({}, state, {
    deleteId: id
  })
}

var initState = {};

// TODO: HANDLE ERRORS
var reducer = function(state, action) {
  state = state || initState;
  switch (action.type){
    case actionTypes.USER_INDEX_LOADING:
      return loadingUsers(state);
    case actionTypes.USER_INDEX_SUCCESS:
      return setUsers(state);
    case actionTypes.USER_INDEX_ERROR:
      return setErrorOnPageLoading(state, action.error);
    case actionTypes.USER_UPDATE_ROLE_LOADING:
      return updatingUsers(state);
    case actionTypes.USER_UPDATE_ROLE_SUCCESS:
      return updateUser(state);
    case actionTypes.USER_UPDATE_ROLE_ERROR:
      return setError(state, action.error);
    case actionTypes.USER_CREATE_LOADING:
    case actionTypes.USER_DELETE_LOADING:
    case actionTypes.USER_RESET_PWD_LOADING:
      return updatingUsers(state);
    case actionTypes.USER_CREATE_SUCCESS:
    case actionTypes.USER_DELETE_SUCCESS:
    case actionTypes.USER_RESET_PWD_SUCCESS:
      return addUser(state);
    case actionTypes.USER_CREATE_ERROR:
    case actionTypes.USER_DELETE_ERROR:
    case actionTypes.USER_RESET_PWD_ERROR:
      return setError(state, action.error);
    case actionTypes.USER_SET_EDIT_MODE:
      return setEditMode(state, action.id);
    case actionTypes.USER_RESET_EDIT_MODE:
      return resetEditMode(state);
    case actionTypes.USER_SET_ADD_MODE:
      return setEditMode(state, undefined);
    default:
      return state;
  }
};

module.exports = reducer;
