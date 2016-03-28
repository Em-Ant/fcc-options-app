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

function clickLink(state, url) {
  /*
    When a click is linked, that link will now be the currentPage.
  */
  return url;
}

/*
Sets the vehicleRoutes state
*/
function loadVehicleRoutes(state, vehicleRoutes) {
  return vehicleRoutes;
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

var currentPage = function(state, action) {
  var initState = '/routes';
  state = state || initState;
  switch (action.type) {
    case 'CLICK_LINK':
      return clickLink(state, action.url);
    default:
      return state;
  }
};

var vehicleRoutes = function(state, action) {
  var init = [];
  state = state || init;
  switch (action.type) {
    case 'RECEIVE_VEHICLE_ROUTES':
      return loadVehicleRoutes(state, action.vehicleRoutes);
    default:
      return state;
  }
};

var rootReducer = combineReducers({
  loggedIn,
  clicks,
  currentPage,
  vehicleRoutes
});
module.exports = rootReducer;
