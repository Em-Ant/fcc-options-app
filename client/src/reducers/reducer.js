var vehicleRoutes =require('./vehicleRoutesReducer.js');
var currentPage = require('./currentPageReducer.js');
var combineReducers = require('redux').combineReducers;
Map = require('immutable').Map

/*
TODO remove.  This is here just as reference  of how to use redux
*/
function setClicks(state, clicks) {
  return state.set('clicks', clicks).delete('loading');
}

/*
TODO remove.  This is here just as reference  of how to use redux
*/
function setLoading(state, what) {
  return state.set('loading', what)
}

/*
TODO not tested.  Not sure if this works.
*/
function logIn(state, user, nClicks) {
  return state.set('loggedIn', true).set('user', user)
}

/*
TODO not tested.  Not sure if this works.
*/
function logOut(state) {
  return state.set('loggedIn', false).delete('user');
}



// TODO remove.  inital state should be in each child reducer
var initState = Map({clicks: 0, loggedIn: false, page: 'main'});
/*
TODO not tested.  Not sure if this works.
*/
var loggedIn = function(state, action) {
  state = state || initState;
  switch (action.type) {
    case 'LOGIN':
      return logIn(state, action.user);
    case 'LOGOUT':
      return logOut(state);
    default:
      return state;
  }
};

/*
TODO remove. This is here for reference on how to use redux
*/
var clicks = function(state, action) {
  state = state || initState;
  switch (action.type) {
    case 'SET_CLICKS':
      return setClicks(state, action.clicks);
    case 'LOADING':
      return setLoading(state, action.what);
    default:
      return state;
  }
};


var rootReducer = combineReducers({
  currentPage:currentPage,
  vehicleRoutes:vehicleRoutes
});
module.exports = rootReducer;
