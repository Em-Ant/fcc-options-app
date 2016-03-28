var appUrl = window.location.origin;
var history = require('react-router').browserHistory;
var Ajax = require('../js/ajax-functions.js');

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

function receiveVehicleRoutes(vehicleRoutes) {
  return {
    type: 'RECEIVE_VEHICLE_ROUTES',
    vehicleRoutes: vehicleRoutes
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

/*
Retrieves the vehicle routes
*/
module.exports.fetchVehicleRoutes = function() {
  // this will return a thunk
  return function(dispatch) {
    // dispatch an action stating that we are requesting routes
    dispatch(requestRoutes());
    // call the external api endpoint to retrieve routes
    Ajax.get('/api/route/', function(err, vehicleRoutes) {

      // an error occurred retrieving vehicle routes
      if (err) {
        // TODO
      } else {

        // request was successful
        // dispatch an action with the received vehicle routes
        dispatch(receiveVehicleRoutes(vehicleRoutes));
      }

    });
    // console.log('fetch vehicle routes action');
    // var vehicleRoutes = [{name:"test1", locationServed:"locationServed", vehicle:'vehicle', consumers:[]}];
    //  return {type: 'RECEIVED_ROUTES', vehicleRoutes:vehicleRoutes }
  }
}
