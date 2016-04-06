
var actionTypes = require('../constants/actionTypes/consumerActionTypes.js');



function updateConsumer (state, updatedConsumer) {
  var s = Object.assign({}, state);
  s.data[updatedConsumer._id] = updatedConsumer;
  return s;
}

function deleteConsumer (state, id) {
  var s = Object.assign({}, state);
  delete s.data[id];
  var ind = s.ids.indexOf(id);
  s.ids.splice(ind, 1);
  return s;
}

function addConsumer (state, newConsumer) {
  var s = Object.assign({}, state);
  s.data[newConsumer._id] = newConsumer;
  s.ids.push(newConsumer._id);
  return s;
}

function setConsumers(state, consumers) {
  var s = {};
  consumers.forEach(function(c){
    s[c._id] = c;
  });
  var ids = Object.keys(s);
  return {ids: ids, data: s};
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
