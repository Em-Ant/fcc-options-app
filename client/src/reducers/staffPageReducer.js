var actionTypes = require('../constants/actionTypes/staffActionTypes');

function fetchRequest(state) {
  return Object.assign({}, state, {
    isLoading: true
  });
}

function fetchFailure(state, error) {
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

function addFailure(state, error) {
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

function updateFailure(state, error) {
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

function destroyFailure(state, error) {
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
    case actionTypes.FETCH_STAFFS_REQUEST:
      return fetchRequest(state);
    case actionTypes.FETCH_STAFFS_FAILURE:
      return fetchFailure(state, action.error);
    case actionTypes.FETCH_STAFFS_SUCCESS:
      return fetchSuccess(state);
    case actionTypes.ADD_STAFF_REQUEST:
      return addRequest(state);
    case actionTypes.ADD_STAFF_FAILURE:
      return addFailure(state, action.error);
    case actionTypes.ADD_STAFF_SUCCESS:
      return add(state);
    case actionTypes.UPDATE_STAFF_REQUEST:
      return updateRequest(state);
    case actionTypes.UPDATE_STAFF_FAILURE:
      return updateFailure(state, action.error);
    case actionTypes.UPDATE_STAFF_SUCCESS:
      return update(state);
    case actionTypes.DESTROY_STAFF_REQUEST:
      return destroyRequest(state);
    case actionTypes.DESTROY_STAFF_FAILURE:
      return destroyFailure(state, action.error);
    case actionTypes.DESTROY_STAFF_SUCCESS:
      return destroy(state);
    case actionTypes.SET_STAFF_EDIT_MODE:
      return setEditMode(state, action.id);
    case actionTypes.SET_STAFF_ADD_MODE:
      return setAddMode(state);
    case actionTypes.CLOSE_STAFF_FORM:
      return closeForm(state);
    default:
      return state;
  }
};

module.exports = staffPageReducer;
