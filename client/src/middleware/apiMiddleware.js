import authActions from "../actions/authActions"
var Ajax = require('../../js/ajax-functions.js');
const CALL_API = "CALL_API";



function appMiddleware({
  getState
}) {
  return (next) => (action) => {

    if (isUnauthorized(action)) {
      authActions.clientLogout()
    }

    if (action.type !== CALL_API) {
      return next(action)
    }
    validate(action);

    var requestType = action.statusTypes[0];
    next({
      type: requestType
    })
    switch (action.method) {
      case "get":
        Ajax[action.method](action.url, function(err, response) {
          handleResponse(err, response, next, action.statusTypes);
        });
        break;
      case "post":
      case "put":
      case "delete":
        Ajax[action.method](action.url, action.data, function(err, response) {
          handleResponse(err, response, next, action.statusTypes);
        });
    }
  }
}

function handleResponse(err, response, next, statusTypes) {
  var failureType = statusTypes[1];
  var successType = statusTypes[2];
  if (err) {
    next({
      type: failureType,
      error: err
    });
  } else {
    next({
      type: successType,
      response: response
    });
  }
}

function validate(action) {
  if (typeof action.url !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (typeof action.method !== 'string') {
    throw new Error('Specify a method.')
  }
  if (!Array.isArray(action.statusTypes) || action.statusTypes.length !== 3) {
    throw new Error('Expected an array of three status types.')
  }
  if (!action.statusTypes.every(type => typeof type === 'string')) {
    throw new Error('Expected status types to be strings.')
  }
}

function isUnauthorized(action) {
  return (action.error && action.error.status == 401)
}

module.exports = appMiddleware;
