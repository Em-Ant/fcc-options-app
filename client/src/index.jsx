
var React = require('react');
var ReactDOM = require('react-dom');
var css = require('../style/main.scss');

var Main = require('./components/adminLTE/main.jsx').MainContainer;
var Login = require('./components/login.jsx').Login;
var Profile = require('./components/profile.jsx').ProfileContainer;
var Signup = require('./components/signup.jsx').Signup;
var Routes = require('./components/routes.jsx');
var AddRoute = require('./components/addRoute.jsx');

var reducer = require('./reducer.js');
 var Provider = require('react-redux').Provider;
 var createStore = require('redux').createStore;
 var applyMiddleware = require('redux').applyMiddleware;


var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var history = require('react-router').browserHistory;

var thunk = require('redux-thunk');

var actions = require('./actions.js');

const store = createStore(reducer,applyMiddleware(thunk));


var App = React.createClass({
  componentDidMount: function() {
    //store.dispatch(actions.requestUser());
  },
  render: function () {
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
        <IndexRoute component={Login} />
        <Route component={Main}>
          <Route path="/routes" component={Routes} />
        </Route>
        <Route path="/profile"component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/addRoute" component={AddRoute} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('appView'));
