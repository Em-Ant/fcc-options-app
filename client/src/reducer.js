
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

var initState = Map({clicks: 0, loggedIn: false, page: 'main'});

module.exports = function(state, action) {
  state = state || initState;
  switch (action.type) {
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
