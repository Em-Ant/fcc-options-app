
var actionTypes = require('../constants/actionTypes/consumerActionTypes.js');

function loadingConsumers(state) {
  return Object.assign({}, state, {
    loadingConsumers: true,
    consumersNeedToBeFetched: undefined
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

    // It's a Lazy loader. On error marks consumers to be loaded again.
    consumersNeedToBeFetched: true,
    // Reset Spinners
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

function setEditMode (state, index) {
  return Object.assign({}, state, {
    editIndex: index,
    displayForm: true
  })
}

function resetEditMode (state) {
  return Object.assign({}, state, {
    editIndex: undefined,
    displayForm: undefined
  })
}

function updateConsumer (state, updatedConsumer, position) {
    return Object.assign({}, state, {
      updatingConsumers: undefined,
      loadingConsumers: undefined,
      editIndex: undefined,
      displayForm: undefined
    });
}

function deleteConsumer (state, position) {
    return Object.assign({}, state, {
      updatingConsumers: undefined,
      loadingConsumers: undefined,
      deleteIndex: undefined,
      updatingConsumers: undefined,
      loadingConsumers: undefined,
      displayForm: undefined
    });
}

function addConsumer (state, newConsumer) {

    return Object.assign({}, state, {
      updatingConsumers: undefined,
      loadingConsumers: undefined,
      displayForm: undefined
    });
}

function setConsumers(state, consumers) {
  return Object.assign({}, state, {
    loadingConsumers: undefined
  })
}

function setItemToDelete(state, index) {
  return Object.assign({}, state, {
    deleteIndex: index
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
      return setConsumers(state, action.consumers);
    case actionTypes.CONSUMER_INDEX_ERROR:
      return setErrorOnPageLoading(state, action.error);
    case actionTypes.CONSUMER_UPDATE_LOADING:
      return updatingConsumers(state);
    case actionTypes.CONSUMER_UPDATE_SUCCESS:
      return updateConsumer(state, action.updatedConsumer, action.position);
    case actionTypes.CONSUMER_UPDATE_ERROR:
      return setError(state, action.error);
    case actionTypes.CONSUMER_CREATE_LOADING:
      return updatingConsumers(state);
    case actionTypes.CONSUMER_CREATE_SUCCESS:
      return addConsumer(state, action.newConsumer);
    case actionTypes.CONSUMER_CREATE_ERROR:
      return setError(state, action.error);
    case actionTypes.CONSUMER_SET_EDIT_MODE:
      return setEditMode(state, action.index);
    case actionTypes.CONSUMER_RESET_EDIT_MODE:
      return resetEditMode(state);
    case actionTypes.CONSUMER_SET_ITEM_TO_DELETE:
      return setItemToDelete(state, action.index);
    case actionTypes.CONSUMER_DELETE_LOADING:
      return updatingConsumers(state);
    case actionTypes.CONSUMER_DELETE_SUCCESS:
      return deleteConsumer(state, action.position);
    case actionTypes.CONSUMER_SET_ADD_MODE:
      return setEditMode(state, undefined);
    default:
      return state;
  }
};

module.exports = reducer;
