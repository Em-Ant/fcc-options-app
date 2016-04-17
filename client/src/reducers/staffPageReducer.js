var actionTypes = require('../constants/actionTypes/staffActionTypes');

function fetchRequest(state) {
  return Object.assign({}, state, {
    isLoading: true
  });
}

function fetchError(state, error) {
  return Object.assign({}, state, {
    isLoading: false,
    message: {
      type: "error",
      msg: error.responseJSON.msg
    }
  });
}

function fetchSuccess(state, vehicles) {
  return Object.assign({}, state, {
    isLoading: false
  });
}

function addRequest(state) {
  var newFormState = Object.assign({}, state.form, {
    isLoading: true
  });
  return Object.assign({}, state, {
    isLoading: true,
    form: newFormState
  });
}

function addError(state, error) {
  var newFormState = Object.assign({}, state.form, {
    isLoading: false,
    message: {
      type: "error",
      msg: error.responseJSON.msg
    }
  })
  return Object.assign({}, state, {
    isLoading: false,
    form: newFormState
  });
}

function add(state) {
  var newFormState = Object.assign({}, state.form, {
    display: false
  })
  return Object.assign({}, state, {
    isLoading: false
  }, {
    form: newFormState
  });
}


function updateRequest(state) {
  var newFormState = Object.assign({}, state.form, {
    isLoading: true
  });
  return Object.assign({}, state, {
    isLoading: true,
    form: newFormState
  });
}

function updateError(state, error) {
  var newFormState = Object.assign({}, state.form, {
    isLoading: false,
    message: {
      type: "error",
      msg: error.responseJSON.msg
    }
  })
  return Object.assign({}, state, {
    isLoading: false,
    form: newFormState
  });
}

function update(state) {

  var newFormState = Object.assign({}, state.form, {
    isLoading: false,
    display: false
  })
  return Object.assign({}, state, {
    isLoading: false
  }, {
    form: newFormState
  });
}


function destroyRequest(state) {
  return Object.assign({}, state, {
    isLoading: true,
    form: {
      display: false
    }
  });
}

function destroyError(state, error) {
  return Object.assign({}, state, {
    isLoading: false,
    message: {
      type: "error",
      msg: error.responseJSON.msg
    }
  });
}

function destroy(state, id) {
  return Object.assign({}, state, {
    isLoading: false
  });
}

function setEditMode(state, id) {

  return Object.assign({}, state, {
    form: {
      display: true,
      verb: 'Edit',
      editId: id
    }
  });
}

function setAddMode(state) {
  return Object.assign({}, state, {
    form: {
      display: true,
      verb: 'Add'
    }
  });
}

function closeForm(state) {
  return Object.assign({}, state, {
    form: {
      display: false
    }
  });
}

var initState = {
  isLoading: false,
  form: {
    display: false
  }
};
var staffPageReducer = function(state, action) {
  state = state || initState;
  switch (action.type) {
    case actionTypes.STAFF_FETCH_REQUEST:
      return fetchRequest(state);
    case actionTypes.STAFF_FETCH_ERROR:
      return fetchError(state, action.error);
    case actionTypes.STAFF_FETCH_SUCCESS:
      return fetchSuccess(state);
    case actionTypes.STAFF_CREATE_REQUEST:
      return addRequest(state);
    case actionTypes.STAFF_CREATE_ERROR:
      return addError(state, action.error);
    case actionTypes.STAFF_CREATE_SUCCESS:
      return add(state);
    case actionTypes.STAFF_UPDATE_REQUEST:
      return updateRequest(state);
    case actionTypes.STAFF_UPDATE_ERROR:
      return updateError(state, action.error);
    case actionTypes.STAFF_UPDATE_SUCCESS:
      return update(state);
    case actionTypes.STAFF_DELETE_REQUEST:
      return destroyRequest(state);
    case actionTypes.STAFF_DELETE_ERROR:
      return destroyError(state, action.error);
    case actionTypes.STAFF_DELETE_SUCCESS:
      return destroy(state);
    case actionTypes.STAFF_SET_EDIT_MODE:
      return setEditMode(state, action.id);
    case actionTypes.STAFF_SET_ADD_MODE:
      return setAddMode(state);
    case actionTypes.STAFF_CLOSE_FORM:
      return closeForm(state);
    default:
      return state;
  }
};

module.exports = staffPageReducer;
