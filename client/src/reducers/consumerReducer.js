
var _ = require('lodash');

function loadingConsumers(state) {
  return _.assign({}, state, {
    loadingConsumers: true,
    consumersNeedToBeFetched: undefined
  });
}

function updatingConsumers(state) {
  return _.assign({}, state, {
    loadingConsumers: true,
    updatingConsumers: true,
  });
}


function setError(state, error) {
  return _.assign({}, state, {
    consumersNeedToBeFetched: true
  });
}

function setEditMode (state, index) {
  return _.assign({}, state, {
    editIndex: index,
    displayForm: true
  })
}

function resetEditMode (state) {
  return _.assign({}, state, {
    editIndex: undefined,
    displayForm: undefined
  })
}

function updateConsumer (state, updatedConsumer, position) {
  var consumers = state.consumers;
  consumers[position] = updatedConsumer;
    return _.assign({}, state, {
      updatingConsumers: undefined,
      loadingConsumers: undefined,
      consumers : consumers,
      editIndex: undefined,
      displayForm: undefined
    });
}

function deleteConsumer (state, position) {
  var consumers = state.consumers;
  consumers.splice(position, 1);
    return _.assign({}, state, {
      updatingConsumers: undefined,
      loadingConsumers: undefined,
      consumers : consumers,
      deleteIndex: undefined,
      updatingConsumers: undefined,
      loadingConsumers: undefined,
      displayForm: undefined
    });
}

function addConsumer (state, newConsumer) {
  var consumers = state.consumers;
  consumers.push(newConsumer);
  // Alphabetically sort by name
  consumers.sort(function(a, b){
    return a.name.localeCompare(b.name);
  })
    return _.assign({}, state, {
      updatingConsumers: undefined,
      loadingConsumers: undefined,
      consumers : consumers,
      displayForm: undefined
    });
}

function setConsumers(state, consumers) {
  // Alphabetically sort by name
  consumers.sort(function(a, b){
    return a.name.localeCompare(b.name);
  })
  return _.assign({}, state, {
    consumers: consumers,
    loadingConsumers: undefined
  })
}

function setItemToDelete(state, index) {
  return _.assign({}, state, {
    deleteIndex: index
  })
}

var initState = {consumers: [], consumersNeedToBeFetched: true};

// TODO: HANDLE ERRORS
var reducer = function(state, action) {
  state = state || initState;
  console.log(action.type);
  switch (action.type){
    case 'CONSUMER_SHOW_LOADING':
      return loadingConsumers(state);
    case 'CONSUMER_SHOW_SUCCESS':
      return setConsumers(state, action.consumers);
    case 'CONSUMER_SHOW_ERROR':
      return setError(state, error);
    case 'CONSUMER_UPDATE_LOADING':
      return updatingConsumers(state);
    case 'CONSUMER_UPDATE_SUCCESS':
      return updateConsumer(state, action.updatedConsumer, action.position);
    case 'CONSUMER_CREATE_LOADING':
      return updatingConsumers(state);
    case 'CONSUMER_CREATE_SUCCESS':
      return addConsumer(state, action.newConsumer);
    case 'CONSUMER_SET_EDIT_MODE':
      return setEditMode(state, action.index);
    case 'CONSUMER_RESET_EDIT_MODE':
      return resetEditMode(state);
    case 'CONSUMER_SET_ITEM_TO_DELETE':
      return setItemToDelete(state, action.index);
    case 'CONSUMER_DELETE_LOADING':
      return updatingConsumers(state);
    case 'CONSUMER_DELETE_SUCCESS':
      return deleteConsumer(state, action.position);
    case 'CONSUMER_SET_ADD_MODE':
      return setEditMode(state, undefined);
    default:
      return state;
  }
};

module.exports = reducer;
