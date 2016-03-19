
var ajax = new(require('../js/ajax-functions.js'));

var appUrl = window.location.origin;
var history = require('./history.js');

function setClicks(nClicks) {
  return {type: 'SET_CLICKS', clicks: nClicks};
};

function logOut() {
  return {type: 'LOGOUT'};
}

function logIn(user, nClicks) {
  return {type: 'LOGIN', user: user, clicks: nClicks };
}

module.exports.reset = function() {
  return function(dispatch) {
    dispatch({type: 'LOADING', what:'clicks'});
    ajax.ajaxRequest('delete', appUrl + '/api/user/clicks', function(j) {
      ajax.ajaxRequest('get', appUrl + '/api/user/clicks', function(data) {
        var nClicks = JSON.parse(data).clicks;
        dispatch(setClicks(nClicks));
      })
    })
  }
}

module.exports.click = function() {
  return function(dispatch) {
    dispatch({type: 'LOADING', what:'clicks'});
    ajax.ajaxRequest('post', appUrl + '/api/user/clicks', function(j) {
      ajax.ajaxRequest('get', appUrl + '/api/user/clicks', function(data) {
        var nClicks = JSON.parse(data).clicks;
        dispatch(setClicks(nClicks));
      })
    })
  }
}



module.exports.requestUser = function() {
  return function(dispatch, getState) {
    ajax.ajaxRequest('get', appUrl + '/api/user', function(data) {
      var user = JSON.parse(data);
      if(user.unauth) {
        dispatch(logOut());
        history.replaceState(null, '/login')
      } else {
        history.replaceState(null, '/main');
        ajax.ajaxRequest('get', appUrl + '/api/user/clicks', function(data) {
          var nClicks = JSON.parse(data).clicks;
          dispatch(logIn(user));
          dispatch(setClicks(nClicks));
        })
      }
    });
  }
}
