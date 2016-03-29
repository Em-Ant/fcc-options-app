var appUrl = window.location.origin;
var history = require('react-router').browserHistory;
var Ajax = require('../../js/ajax-functions.js');

/*
 Creates a CLICK_LINK action
*/
module.exports.clickLink = function(url) {
  return {
    type: 'CLICK_LINK',
    url: url
  }
}

function setClicks(nClicks) {
  return {
    type: 'SET_CLICKS',
    clicks: nClicks
  };
};

function logOut() {
  return {
    type: 'LOGOUT'
  };
}

function logIn(user, nClicks) {
  return {
    type: 'LOGIN',
    user: user,
    clicks: nClicks
  };
}

function requestRoutes() {
  return {
    type: 'REQUEST_ROUTES'
  };
}


module.exports.reset = function() {
  return function(dispatch) {
    dispatch({
      type: 'LOADING',
      what: 'clicks'
    });
    $.ajax({
      type: "DELETE",
      url: appUrl + '/api/user/clicks',
      success: function(j) {
        $.get(appUrl + '/api/user/clicks', function(data) {
          var nClicks = data.clicks;
          dispatch(setClicks(nClicks));
        })
      }
    })
  }
}

module.exports.click = function() {
  return function(dispatch) {
    dispatch({
      type: 'LOADING',
      what: 'clicks'
    });
    $.post(appUrl + '/api/user/clicks', function(j) {
      $.get(appUrl + '/api/user/clicks', function(data) {
        var nClicks = data.clicks;
        dispatch(setClicks(nClicks));
      })
    })
  }
}

module.exports.requestUser = function() {
  return function(dispatch, getState) {
    $.get(appUrl + '/api/user', function(data) {
      var user = data;
      if (user.unauth) {
        dispatch(logOut());
        history.replace('/login')
      } else {
        history.replace('/main');
        $.get(appUrl + '/api/user/clicks', function(data) {
          var nClicks = data.clicks;
          dispatch(logIn(user));
          dispatch(setClicks(nClicks));
        })
      }
    });
  }
}
