
var _ = require('lodash');

function loadingConsumers(state) {
  return _.assign({}, state, {
    loadingConsumers: true,
    consumersNeedToBeFetched: undefined
  });
}

function setError(state, error) {
  return _.assign({}, state, {
    consumersNeedToBeFetched: true
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

var initState = {consumers: [], consumersNeedToBeFetched: true};

var consumerReducer = function(state, action) {
  state = state || initState;
  console.log(action.type);
  switch (action.type){
    case 'CONSUMER_SHOW_LOADING':
      return loadingConsumers(state);
    case 'CONSUMER_SHOW_SUCCESS':
      return setConsumers(state, action.consumers);
    case 'CONSUMER_SHOW_ERROR':
      return setError(state, error)
    default:
      return state;
  }
};

module.exports = consumerReducer;
