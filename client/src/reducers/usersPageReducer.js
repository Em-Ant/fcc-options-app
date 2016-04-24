
var actionTypes = require('../constants/actionTypes/modelActionTypes');
const USERS = require('../constants/models').USERS;

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

  console.log(action.type, action.status, action.model, action.error);

  if (action.model !== USERS) {
    return state;
  }
  switch (action.type){
    case actionTypes.FETCH:
      if (action.status === actionTypes.LOADING) {
        return loadingUsers(state);
      }
      if (action.status === actionTypes.SUCCESS) {
        return setUsers(state);
      }
      if (action.status === actionTypes.ERROR) {
        return setErrorOnPageLoading(state, action.error);
      }
    case actionTypes.CREATE:
      if (action.status === actionTypes.LOADING) {
        return updatingUsers(state);
      }
      if (action.status === actionTypes.SUCCESS) {
        return addUser(state);
      }
      if (action.status === actionTypes.ERROR) {
        return setError(state, action.error);
      }
    case actionTypes.UPDATE:
      if (action.status === actionTypes.LOADING) {
        return updatingUsers(state);
      }
      if (action.status === actionTypes.SUCCESS) {
        return updateUser(state);
      }
      if (action.status === actionTypes.ERROR) {
        return setError(state, action.error);
      }
    case actionTypes.DELETE:
      if (action.status === actionTypes.LOADING) {
        return updatingUsers(state);
      }
      if (action.status === actionTypes.SUCCESS) {
        return addUser(state);
      }
      if (action.status === actionTypes.ERROR) {
        return setError(state, action.error);
      }

    case actionTypes.SET_EDIT_MODE:
      return setEditMode(state, action.id);
    case actionTypes.SET_ADD_MODE:
      return setEditMode(state, undefined);
    case actionTypes.CLOSE_FORM:
      return resetEditMode(state);
    default:
      return state;
  }
};

module.exports = reducer;
