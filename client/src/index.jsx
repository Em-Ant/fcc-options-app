var React = require('react');
var ReactDOM = require('react-dom');
var css = require('../style/main.scss');

var Main = require('./components/adminLTE/main.jsx');
var NotFound = require('./components/notFound.jsx');
var Login = require('./containers/loginContainer.jsx');
var Logout = require('./components/auth/logoutComponent.jsx');
var Signup = require('./components/auth/signupComponent.jsx').Signup;
var VehicleRoutes = require('./containers/vehicleRoutesContainer.jsx');
var Vehicles = require('./containers/vehiclesContainer.jsx');

var Consumers = require('./containers/consumersPageContainer.jsx');

var ConsumerRoute3 = require('./components/mapPage/mapWrapper.jsx');
var ConsumerRoute2 = require('./components/consumerRouteMapTest_AA.jsx');
var ConsumerRoute = require('./components/consumerRouteMapTest_EA.jsx');

var reducer = require('./reducers/reducer.js');
var Provider = require('react-redux').Provider;
var createStore = require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var appMiddleware = require('./middleware/appMiddleware.js');
var combineReducers = require('redux').combineReducers;

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var NotFoundRoute = require('react-router').NotFoundRoute;
var browserHistory = require('react-router').browserHistory;
var thunk = require('redux-thunk');
var syncHistoryWithStore = require('react-router-redux').syncHistoryWithStore;

var settingsActions = require("./actions/settingsActions");
var consumerActions = require("./actions/consumerActions");
var vehicleActions = require("./actions/vehicleActions");

var store = createStore(reducer, applyMiddleware(thunk, appMiddleware));

// Creates an enhanced history that syncs navigation events with the store
var history = syncHistoryWithStore(browserHistory, store)

var requireAuth = require('./auth/auth').requireAuth;

var App = React.createClass({

  render: function() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
});

ReactDOM.render(
  <Provider store={store}>
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Login}/>
      <Route component={Main}  onEnter={requireAuth} >
        <Route path="/routes" component={VehicleRoutes} onEnter={requireAuth} />
        <Route path="/consumers" component={Consumers} onEnter={requireAuth} />
        <Route path="/vehicles" component={Vehicles} onEnter={requireAuth} />
        {/*<Route path="/consumer-map" component={ConsumerMap} />*/}
        <Route path="/map-test" component={ConsumerRoute3} onEnter={requireAuth} />
        <Route path="/consumer-route" component={ConsumerRoute} onEnter={requireAuth} />
        <Route path="/consumer-route2" component={ConsumerRoute2} onEnter={requireAuth} />
      </Route>
      <Route path="/login" component={Login}/>
      <Route path="/logout" component={Logout}/>
      <Route path="/signup" component={Signup}/>
   	  <Route path="*" component={NotFound}/>
    </Route>
  </Router>
</Provider>, document.getElementById('appView'));
