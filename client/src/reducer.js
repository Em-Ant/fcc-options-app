
Map = require('immutable').Map

function setClicks(state, clicks) {
  return state.set('clicks', clicks).delete('loading');
}

function setLoading(state, what) {
  return state.set('loading', what)
}

function logIn(state, user, nClicks) {
  return state.set('loggedIn', true).set('user', user)
}

function logOut(state) {
  return state.set('loggedIn', false).delete('user');
}


function clickLink(state, url) {
  /*
    When a click is linked, that link will now be the currentPage.
    Since state is supposed to be immutable,
    Object.assign is used to create a brand new object
  */
  var state = Object.assign({}, state, {currentPage:url});
  return state;
}

var initState = Map({clicks: 0, loggedIn: false, page: 'main', currentPage:'/routes'});

module.exports = function(state, action) {
  state = state || initState;
  switch (action.type) {
    case 'CLICK_LINK':
      return clickLink(state, action.url);
    case 'SET_CLICKS':
      return setClicks(state, action.clicks);
    case 'LOGIN':
      return logIn(state, action.user);
    case 'LOGOUT':
      return logOut(state);
    case 'LOADING':
      return setLoading(state, action.what);
    default:
      return state;
  }
};
