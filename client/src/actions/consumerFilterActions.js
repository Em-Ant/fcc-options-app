
var filterATypes = require('../constants/actionTypes/consumerFilterActionTypes');
var models = require('../constants/models');

module.exports.setConsumersFilterNeeds = function(filter) {
  return {
    type : filterATypes.CONSUMER_FILTER_NEEDS,
    model: models.CONSUMERS,
    value: filter
  }
}

module.exports.setConsumersFilterString = function(filterString) {
  return {
    type : filterATypes.CONSUMER_FILTER_STRING,
    model: models.CONSUMERS,
    value: filterString
  }
}

module.exports.setConsumersFilterType = function(typeString) {
  return {
    type : filterATypes.CONSUMER_FILTER_TYPE,
    model: models.CONSUMERS,
    value: typeString
  }
}
