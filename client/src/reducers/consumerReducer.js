
var actionTypes = require('../constants/actionTypes/consumerActionTypes.js');



function updateConsumer (state, updatedConsumer) {
  var data = Object.assign({},state.data);
  var ids = state.ids.slice();
  data[updatedConsumer._id] = updatedConsumer;
  
  return Object.assign({}, state, {data: data, ids: ids});
}

function deleteConsumer (state, id) {
  var data = Object.assign({},state.data);
  var ids = state.ids.slice();
  delete data[id];
  var ind = ids.indexOf(id);
  ids.splice(ind, 1);
  
  return Object.assign({}, state, {ids: ids, data: data});
}

function addConsumer (state, newConsumer) {
  
  var data = Object.assign({},state.data);
  var ids = state.ids.slice();
  data[newConsumer._id] = newConsumer;
  ids.push(newConsumer._id);
  var newState = Object.assign({}, state, {ids: ids, data: data});

  return newState;
}

function setConsumers(state, consumers) {
  var s = {};
  consumers.forEach(function(c){
    s[c._id] = c;
  });
  var ids = Object.keys(s);
  return Object.assign({}, state, {data: s, ids: ids});
}



// TODO: HANDLE ERRORS
var reducer = function(state, action) {
  state = state || {ids:[], data:{}};
  switch (action.type){
    case actionTypes.CONSUMER_INDEX_SUCCESS:
      return setConsumers(state, action.consumers);
    case actionTypes.CONSUMER_UPDATE_SUCCESS:
      return updateConsumer(state, action.updatedConsumer);
    case actionTypes.CONSUMER_CREATE_SUCCESS:
      return addConsumer(state, action.newConsumer);
    case actionTypes.CONSUMER_DELETE_SUCCESS:
      return deleteConsumer(state, action.id);
    default:
      return state;
  }
};

module.exports = reducer;
