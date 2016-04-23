
var actionTypes = require('../constants/actionTypes/modelActionTypes');
const CONSUMERS = require('../constants/models').CONSUMERS;

function loadingConsumers(state) {
  return Object.assign({}, state, {
    loadingConsumers: true,
  });
}

function updatingConsumers(state) {
  return Object.assign({}, state, {
    loadingConsumers: true,
    updatingConsumers: true,
  });
}

// TODO: Handle error message display in Error Handlers

function setErrorOnPageLoading(state, error) {
  return Object.assign({}, state, {

    updatingConsumers: undefined,
    loadingConsumers: undefined
  });
}

function setError(state, error) {
  return Object.assign({}, state, {

    errorMsg: error.responseJSON.msg,
    // Reset Spinners
    updatingConsumers: undefined,
    loadingConsumers: undefined
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
    errorMsg: undefined,
    editId: undefined,
    displayForm: undefined
  })
}

function updateConsumer (state) {
    return Object.assign({}, state, {
      errorMsg: undefined,
      updatingConsumers: undefined,
      loadingConsumers: undefined,
      editId: undefined,
      displayForm: undefined
    });
}

function deleteConsumer (state) {
    return Object.assign({}, state, {
      errorMsg: undefined,
      updatingConsumers: undefined,
      loadingConsumers: undefined,
      deleteId: undefined,
      updatingConsumers: undefined,
      loadingConsumers: undefined,
      displayForm: undefined
    });
}

function addConsumer (state) {

    return Object.assign({}, state, {
      errorMsg: undefined,
      updatingConsumers: undefined,
      loadingConsumers: undefined,
      displayForm: undefined
    });
}

function setConsumers(state) {
  return Object.assign({}, state, {
    loadingConsumers: undefined
  })
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

  if (action.model !== CONSUMERS) {
    return state;
  }

  if (action.type === actionTypes.FETCH) {
    switch (action.status) {
      case actionTypes.LOADING:
        return loadingConsumers(state);
      case actionTypes.ERROR:
        return setErrorOnPageLoading(state, action.error);
      case actionTypes.SUCCESS:
        return setConsumers(state);
      default:
        return state;
    }
  }

  if (action.type === actionTypes.CREATE) {
    switch (action.status) {
      case actionTypes.LOADING:
        return updatingConsumers(state);
      case actionTypes.ERROR:
        return setError(state, action.error);
      case actionTypes.SUCCESS:
        return addConsumer(state);
      default:
        return state;
    }
  }

  if (action.type === actionTypes.UPDATE) {
    switch (action.status) {
      case actionTypes.LOADING:
        return updatingConsumers(state);
      case actionTypes.ERROR:
        return setError(state, action.error);
      case actionTypes.SUCCESS:
        return updateConsumer(state);
      default:
        return state;
    }
  }

  if (action.type === actionTypes.DELETE) {
    switch (action.status) {
      case actionTypes.LOADING:
        return updatingConsumers(state);
      case actionTypes.ERROR:
        return setError(state, action.error);
      case actionTypes.SUCCESS:
        return deleteConsumer(state);
      default:
        return state;
    }
  }

  switch (action.type){

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
