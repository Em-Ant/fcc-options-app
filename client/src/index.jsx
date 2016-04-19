var React = require('react');
var ReactDOM = require('react-dom');
var css = require('../style/main.scss');

var Main = require('./components/adminLTE/main.jsx');
var NotFound = require('./components/adminLTE/notFound.jsx');
var NotPermitted = require('./components/adminLTE/notPermitted.jsx');
var Login = require('./containers/loginContainer.jsx');
var Logout = require('./components/auth/logoutComponent.jsx');
var Signup = require('./components/auth/signupComponent.jsx').Signup;
var VehicleRoutes = require('./containers/vehicleRoutesContainer.jsx');
var Vehicles = require('./components/vehiclesPage/vehiclesComponent.jsx');
var Staff = require('./components/staffPage/staffComponent.jsx');

var Consumers = require('./containers/consumersPageContainer.jsx');

var ConsumerRoute3 = require('./components/mapPage/mapWrapper.jsx');
var MapPageTest = require('./components/mapPageTest/mapWrapper.jsx');
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

var store = createStore(reducer, applyMiddleware(thunk, appMiddleware));

// Creates an enhanced history that syncs navigation events with the store
var history = syncHistoryWithStore(browserHistory, store)

var requireAuth = require('./actions/authActions').requireAuth;
var requireRole = require('./actions/authActions').requireRole;
const ADMIN = require('./constants/userRoles').ADMIN;

// test server code
var User = require('./components/usersPage/usersComponent.jsx');

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
        <Route path="/map-test" component={MapPageTest} onEnter={requireAuth} />
        <Route path="/users" component={User} onEnter={requireRole.bind(null, ADMIN)} />
        <Route path="/staff" component={Staff} onEnter={requireAuth} />
        <Route path="/notPermitted" component={NotPermitted} />
      </Route>
      <Route path="/login" component={Login}/>
      <Route path="/logout" component={Logout}/>

   	  <Route path="*" component={NotFound}/>
    </Route>
  </Router>
</Provider>, document.getElementById('appView'));
