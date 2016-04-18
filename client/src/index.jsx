var React = require('react');
var ReactDOM = require('react-dom');
var css = require('../style/main.scss');

var Main = require('./components/adminLTE/main.jsx');
var NotFound = require('./components/notFound.jsx');
var Login = require('./containers/loginContainer.jsx');
var Logout = require('./components/auth/logoutComponent.jsx');
var Signup = require('./components/auth/signupComponent.jsx').Signup;
var VehicleRoutes = require('./containers/vehicleRoutesContainer.jsx');
var Vehicles = require('./components/vehiclesPage/vehiclesComponent.jsx');
var Staff = require('./components/staffPage/staffComponent.jsx');

var Consumers = require('./containers/consumersPageContainer.jsx');

var ConsumerRoute3 = require('./components/mapPage/mapWrapper.jsx');
var ConsumerRoute2 = require('./components/consumerRouteMapTest_AA.jsx');
var ConsumerRoute = require('./components/consumerRouteMapTest_EA.jsx');

var reducer = require('./reducers/reducer.js');
var Provider = require('react-redux').Provider;
var createStore = require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var apiMiddleware = require('./middleware/apiMiddleware.js');
var combineReducers = require('redux').combineReducers;

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var NotFoundRoute = require('react-router').NotFoundRoute;
var browserHistory = require('react-router').browserHistory;
var thunk = require('redux-thunk');
var syncHistoryWithStore = require('react-router-redux').syncHistoryWithStore;

var store = createStore(reducer, applyMiddleware(thunk, apiMiddleware));

// Creates an enhanced history that syncs navigation events with the store
var history = syncHistoryWithStore(browserHistory, store)

var requireAuth = require('./auth/auth').requireAuth;

// test server code
var UserTests = require('./components/usersComponent.jsx');

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
      <Route component={Main}  onEnter={requireAuth} >
        <IndexRoute component={ConsumerRoute3}/>
        <Route path="/routes" component={VehicleRoutes} onEnter={requireAuth} />
        <Route path="/consumers" component={Consumers} onEnter={requireAuth} />
        <Route path="/vehicles" component={Vehicles} onEnter={requireAuth} />
        <Route path="/consumer-route" component={ConsumerRoute} onEnter={requireAuth} />
        <Route path="/consumer-route2" component={ConsumerRoute2} onEnter={requireAuth} />
        <Route path="/users" component={UserTests}/>
        <Route path="/staff" component={Staff} onEnter={requireAuth} />
      </Route>
      <Route path="/login" component={Login}/>
      <Route path="/logout" component={Logout}/>

   	  <Route path="*" component={NotFound}/>
    </Route>
  </Router>
</Provider>, document.getElementById('appView'));
