
var actionTypes = require('../constants/actionTypes/consumerActionTypes.js');

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
    editId: undefined,
    displayForm: undefined
  })
}

function updateConsumer (state) {
    return Object.assign({}, state, {
      updatingConsumers: undefined,
      loadingConsumers: undefined,
      editId: undefined,
      displayForm: undefined
    });
}

function deleteConsumer (state) {
    return Object.assign({}, state, {
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
  console.log(action.type);
  switch (action.type){
    case actionTypes.CONSUMER_INDEX_LOADING:
      return loadingConsumers(state);
    case actionTypes.CONSUMER_INDEX_SUCCESS:
      return setConsumers(state);
    case actionTypes.CONSUMER_INDEX_ERROR:
      return setErrorOnPageLoading(state, action.error);
    case actionTypes.CONSUMER_UPDATE_LOADING:
      return updatingConsumers(state);
    case actionTypes.CONSUMER_UPDATE_SUCCESS:
      return updateConsumer(state);
    case actionTypes.CONSUMER_UPDATE_ERROR:
      return setError(state, action.error);
    case actionTypes.CONSUMER_CREATE_LOADING:
      return updatingConsumers(state);
    case actionTypes.CONSUMER_CREATE_SUCCESS:
      return addConsumer(state);
    case actionTypes.CONSUMER_CREATE_ERROR:
      return setError(state, action.error);
    case actionTypes.CONSUMER_SET_EDIT_MODE:
      return setEditMode(state, action.id);
    case actionTypes.CONSUMER_RESET_EDIT_MODE:
      return resetEditMode(state);
    case actionTypes.CONSUMER_SET_ITEM_TO_DELETE:
      return setItemToDelete(state, action.id);
    case actionTypes.CONSUMER_DELETE_LOADING:
      return updatingConsumers(state);
    case actionTypes.CONSUMER_DELETE_SUCCESS:
      return deleteConsumer(state);
    case actionTypes.CONSUMER_SET_ADD_MODE:
      return setEditMode(state, undefined);
    default:
      return state;
  }
};

module.exports = reducer;
