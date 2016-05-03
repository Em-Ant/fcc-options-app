var actionTypes = require('../constants/actionTypes/modelActionTypes');

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

function setPage(state, page) {
  return Object.assign({}, state, {page: page})
}


var initState = {
  page : 1,
  itemsPerPage : 10,
  isLoading: false,
  form: {
    display: false
  }
};
var modelPageReducer = function(state, action) {
  state = state || initState;

  console.log(action.type, action.model)
  switch (action.type) {
    case actionTypes.INDEX:
      if (action.status == actionTypes.LOADING)
        return fetchRequest(state);
      if (action.status == actionTypes.SUCCESS)
        return fetchSuccess(state);
      if (action.status == actionTypes.ERROR)
        return fetchError(state, action.error);
    case actionTypes.CREATE:
      if (action.status == actionTypes.LOADING)
        return addRequest(state);
      if (action.status == actionTypes.SUCCESS)
        return add(state);
      if (action.status == actionTypes.ERROR)
        return addError(state, action.error);
    case actionTypes.UPDATE:
      if (action.status == actionTypes.LOADING)
        return updateRequest(state);
      if (action.status == actionTypes.SUCCESS)
        return update(state);
      if (action.status == actionTypes.ERROR)
        return updateError(state, action.error);
    case actionTypes.DELETE:
      if (action.status == actionTypes.LOADING)
        return destroyRequest(state);
      if (action.status == actionTypes.SUCCESS)
        return destroy(state);
      if (action.status == actionTypes.ERROR)
        return destroyError(state, action.error);
    case actionTypes.SET_EDIT_MODE:
      return setEditMode(state, action.id);
    case actionTypes.SET_ADD_MODE:
      return setAddMode(state);
    case actionTypes.CLOSE_FORM:
      return closeForm(state);
    case actionTypes.SET_PAGE :
      return setPage(state, action.page)
    default:
      return state;
  }
};

module.exports = modelPageReducer;
