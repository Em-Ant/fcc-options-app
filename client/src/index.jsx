//For React performance debugging
//document.Perf = require('react-addons-perf')

var React = require('react');
var ReactDOM = require('react-dom');
require('../style/main.scss');

var Main = require('./components/adminLTE/main.jsx');
var NotFound = require('./components/adminLTE/notFound.jsx');
var NotPermitted = require('./components/adminLTE/notPermitted.jsx');
var Login = require('./containers/loginContainer.jsx');
var Logout = require('./components/auth/logoutComponent.jsx');
var VehicleRoutes = require('./containers/vehicleRoutesContainer.jsx');
var Vehicles = require('./components/vehiclesPage/vehiclesComponent.jsx');
var Staff = require('./components/staffPage/staffComponent.jsx');

var Consumers = require('./containers/consumersPageContainer.jsx');

var MapPage = require('./components/mapPage/mapWrapper.jsx');

var reducer = require('./reducers/reducer.js');
var Provider = require('react-redux').Provider;
var createStore = require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var appMiddleware = require('./middleware/appMiddleware.js');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
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
        <IndexRoute component={MapPage}/>
        <Route path="/routes" component={VehicleRoutes} onEnter={requireAuth} />
        <Route path="/consumers" component={Consumers} onEnter={requireAuth} />
        <Route path="/vehicles" component={Vehicles} onEnter={requireAuth} />
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
