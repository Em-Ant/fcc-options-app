
var actionTypes = require('../constants/actionTypes/consumerActionTypes.js');



function updateConsumer (state, updatedConsumer, position) {
  var consumers = state.slice();
  consumers[position] = updatedConsumer;
    return consumers;
}

function deleteConsumer (state, position) {
  var consumers = state.slice();
  consumers.splice(position, 1);
    return consumers;
}

function addConsumer (state, newConsumer) {
  var consumers = state.slice();
  consumers.push(newConsumer);
    return consumers;
}

function setConsumers(state, consumers) {
  return consumers;
}



// TODO: HANDLE ERRORS
var reducer = function(state, action) {
  state = state || [];
  switch (action.type){
    case actionTypes.CONSUMER_INDEX_SUCCESS:
      return setConsumers(state, action.consumers);
    case actionTypes.CONSUMER_UPDATE_SUCCESS:
      return updateConsumer(state, action.updatedConsumer, action.position);
    case actionTypes.CONSUMER_CREATE_SUCCESS:
      return addConsumer(state, action.newConsumer);
    case actionTypes.CONSUMER_DELETE_SUCCESS:
      return deleteConsumer(state, action.position);
    default:
      return state;
  }
};

module.exports = reducer;
